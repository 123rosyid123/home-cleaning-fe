import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiAvailableTimes } from '@/services/bookingService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const response = await apiAvailableTimes(payload);
        return NextResponse.json(
            buildSuccessResponse('Available times fetched successfully', response.data)
        );
    } catch (error: unknown) {
        return NextResponse.json(buildErrorResponse(error as Error), {
            status: 500,
        });
    }
}