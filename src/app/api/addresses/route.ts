import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiGetAddresses } from '@/services/addressService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const addresses = await apiGetAddresses();

    return NextResponse.json(
      buildSuccessResponse('Addresses fetched successfully', addresses.data)
    );
  } catch (error: unknown) {
    return NextResponse.json(buildErrorResponse(error as Error), {
      status: 500,
    });
  }
}
