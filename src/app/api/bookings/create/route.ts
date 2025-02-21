import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiCreateBooking } from "@/services/bookingService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const response = await apiCreateBooking(payload);
        return NextResponse.json(
            buildSuccessResponse('Booking created successfully', response.data)
        );
    } catch (error: unknown) {
        return NextResponse.json(buildErrorResponse(error as Error), {
            status: 500,
        });
    }
}