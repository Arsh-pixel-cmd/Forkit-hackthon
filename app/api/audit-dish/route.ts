import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Force use of local Deno proxy port for now (bypassing potentially stale .env)
const SUPABASE_URL = 'http://127.0.0.1:8000';
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:8000';
const PROXY_ENDPOINT = `${SUPABASE_URL}/api-proxy`; // Direct path when running standalone


/**
 * Proxy-based Dish Audit
 * Connects to Gemini for visual analysis and FlavorDB/RecipeDB via Supabase Edge Function
 */
export async function POST(req: Request) {
    try {
        const { orderId, photoUrls } = await req.json();

        // Basic validation
        if (!orderId && (!photoUrls || photoUrls.length < 1)) {
            // Relaxed validation for testing: just need one of them or at least SOMETHING
        }

        console.log("Audit received for:", orderId);

        // --- REAL LOGIC ---

        let dishName = "Detected Dish";
        let isFood = true;
        let analysisResult = null;

        // 1. GEMINI ANALYSIS
        if (photoUrls && photoUrls[0]) {
            console.log("Running Gemini Analysis...");
            analysisResult = await analyzeImageWithGemini(photoUrls[0]);

            if (analysisResult) {
                console.log("Gemini Result:", analysisResult);
                if (analysisResult.isFood === false) { // Explicit false check
                    return NextResponse.json({
                        status: 'error',
                        reason: analysisResult.reason || analysisResult.error || 'Image does not appear to be food.',
                        refundAmount: 0 // No refund for non-food
                    });
                }
                dishName = analysisResult.dishName || dishName;
                isFood = true;
            }
        } else {
            console.warn("Skipping Gemini: No Photo");
        }

        // 2. RECIPEDB SEARCH & DETAILS
        // Search for the identified dish
        const searchPath = `/recipedb/recipe2-api/recipe/search?q=${encodeURIComponent(dishName)}`;
        let recipe = null;
        let flavorData = null;

        try {
            // A. Search RecipeDB
            console.log(`Searching RecipeDB Proxy: ${PROXY_ENDPOINT}${searchPath}`);
            const searchResp = await fetch(`${PROXY_ENDPOINT}${searchPath}`, {
                headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}` }
            });

            if (searchResp.ok) {
                const searchData = await searchResp.json();
                const recipes = searchData.payload?.data || searchData;

                if (Array.isArray(recipes) && recipes.length > 0) {
                    recipe = recipes[0];
                }
            }

            // B. Search FlavorDB (New Integration)
            // Use Entity Controller to find flavor info for the dish/ingredient
            // Endpoint: /entities/by-entity-alias-readable?alias={dishName}
            const flavorPath = `/flavordb/entities/by-entity-alias-readable?alias=${encodeURIComponent(dishName)}`;
            console.log(`Searching FlavorDB Proxy: ${PROXY_ENDPOINT}${flavorPath}`);
            const flavorResp = await fetch(`${PROXY_ENDPOINT}${flavorPath}`, {
                headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}` }
            });

            if (flavorResp.ok) {
                flavorData = await flavorResp.json();
                console.log("FlavorDB Data found:", flavorData ? "Yes" : "No");
            } else {
                console.warn("FlavorDB Search Failed:", flavorResp.status);
            }

        } catch (e) {
            console.error("Database Search Failed:", e);
            // Continue even if DB search fails, using Gemini data if available
        }

        // Combine Data
        // Prioritize RecipeDB > FlavorDB > Gemini > Default
        const finalIngredients = recipe
            ? parseIngredients(recipe.Ingredients || recipe.ingredients)
            : (flavorData ? [flavorData.entity_alias_readable || dishName]
                : (analysisResult?.ingredients || ['Unknown']));

        const finalCalories = recipe
            ? Math.round(parseFloat(recipe.Energy || recipe.Calories || '0'))
            : (analysisResult?.calories || 0);

        return NextResponse.json({
            status: 'success',
            message: `Dish verified: ${dishName}`,
            data: {
                isFood: true,
                freshness: analysisResult?.freshness || 'fresh',
                score: recipe ? 92 : (flavorData ? 88 : (analysisResult ? 85 : 50)),
                ingredients: finalIngredients,
                calories: finalCalories,
                recipeName: recipe ? recipe.Recipe_title : (flavorData?.entity_alias_readable || dishName),
                protein: recipe ? parseFloat(recipe.Protein || '0') : 0,
                fat: recipe ? parseFloat(recipe['Total lipid (fat)'] || '0') : 0,
                category: flavorData?.category_readable || 'General Food'
            }
        });

    } catch (error) {
        console.error("API Route Error Detailed:", error);
        return NextResponse.json({
            status: 'error',
            message: 'Internal Server Error',
            debug: String(error)
        }, { status: 500 });
    }
}


// --- GEMINI INTEGRATION ---
async function analyzeImageWithGemini(base64Data: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.startsWith("TODO")) {
        console.warn("GEMINI_API_KEY is missing or not set. Initializing dummy response for development.");
        // Fallback for when user hasn't set the key yet
        return {
            isFood: true,
            dishName: "Test Food (Key Missing)",
            ingredients: ["Sample Ingredient 1", "Sample Ingredient 2"],
            freshness: "fresh",
            calories: 250
        };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Clean base64 for Gemini (remove data:image/...;base64, prefix if present)
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `Analyze this food image. 
    Return a strictly valid JSON object with no markdown formatting.
    The JSON should have these fields:
    - isFood: boolean
    - dishName: string (e.g. "Pepperoni Pizza", "Caesar Salad")
    - ingredients: string[] (list of visible or likely ingredients)
    - freshness: "fresh" | "caution" | "spoiled" (based on visual cues)
    - calories: number (estimated total calories)
    - reason: string (if not food, explain why)

    If it is NOT food, set isFood to false.`;

    try {
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Content,
                    mimeType: "image/jpeg", // Assuming JPEG/PNG, Gemini is flexible
                },
            },
        ]);

        const response = await result.response;
        let text = response.text();

        console.log("Raw Gemini Response:", text);

        // Clean up markdown code blocks if Gemini ignores the system instruction to not use them
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse Gemini JSON:", e);
            return { isFood: true, dishName: "Unknown", error: "JSON Parse Error" };
        }
    } catch (e) {
        console.error("Gemini API Failed:", e);
        return { isFood: false, error: String(e) };
    }
}

function parseIngredients(ingString: string | unknown[]): string[] {
    if (Array.isArray(ingString)) return ingString.map(i => String(i));
    if (typeof ingString === 'string') {
        // RecipeDB often returns JSON-like strings or CSV
        // Try to parse if it looks like JSON array [ ... ]
        if (ingString.trim().startsWith('[') && ingString.trim().endsWith(']')) {
            try {
                const parsed = JSON.parse(ingString.replace(/'/g, '"')); // Replace single quotes just in case
                if (Array.isArray(parsed)) return parsed;
            } catch (e) { /* ignore */ }
        }
        return ingString.split(',').slice(0, 5).map(s => s.trim());
    }
    return ['Spices', 'Main Ingredient'];
}

