/**
 * Foodoscope API Type Definitions
 * Interfaces for RecipeDB, FlavorDB, and SustainableFoodDB interactions.
 */

export interface RecipeProfile {
    id: string;
    name: string;
    ingredients: string[];
    steps: string[];
    nutritionalInfo: {
        calories: number;
        protein: number;
        fat: number;
        carbs: number;
    };
}

export interface FlavorProfile {
    moleculeId: string;
    name: string;
    compatibilityScore: number;
}

export interface EcoScore {
    carbonFootprint: number; // kg CO2e
    distanceFromSource: number; // km
    score: 'A' | 'B' | 'C' | 'D' | 'E';
}

// Mock Functions
export const fetchRecipeProfile = async (id: string): Promise<RecipeProfile | null> => {
    return null; // Mock
};

export const calculateEcoScore = (ingredients: string[], distance: number): EcoScore => {
    return { carbonFootprint: 1.2, distanceFromSource: distance, score: 'A' };
};
