import { NextResponse } from 'next/server';
import { apiGetDurations } from '@/services/durationService';
import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const response = await apiGetDurations();
    return NextResponse.json(
      buildSuccessResponse('Durations fetched successfully', response.data)
    );
  } catch (error: unknown) {
    return NextResponse.json(buildErrorResponse(error as Error), {
      status: 500,
    });
  }
}


