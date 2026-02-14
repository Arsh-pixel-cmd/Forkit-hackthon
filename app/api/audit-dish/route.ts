import { NextResponse } from 'next/server';

/**
 * MOCK API for Dish Audit
 * Simulates checking RecipeDB, FlavorDB, and SustainableFoodDB.
 */
export async function POST(req: Request) {
    try {
        const { orderId, photoUrls } = await req.json();

        if (!orderId || !photoUrls || photoUrls.length < 5) {
            return NextResponse.json({ status: 'fail', reason: 'Incomplete Evidence' }, { status: 400 });
        }

        // --- MOCK LOGIC ---

        // 1. Simulate Analysis Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 2. Randomize Result for Demo
        // 70% Success, 30% Failure (Mismatch)
        const isSuccess = Math.random() > 0.3;

        if (isSuccess) {
            return NextResponse.json({
                status: 'success',
                message: 'Dish matches RecipeDB profile #4092. Flavor compounds align with specification.'
            });
        } else {
            // Failure case
            return NextResponse.json({
                status: 'fail',
                reason: 'FlavorDB Flag: Unexpected capsaicin levels detect. Color mismatch in "Side 45°".',
                action: 'InstantPartialRefund',
                refundAmount: 150.00
            }, { status: 400 }); // Or 200 with fail status depending on client logic, usually 200 for business logic failure, 400 for bad request. I'll stick to 200 but status field.
        }

    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}
