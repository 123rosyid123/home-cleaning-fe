import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiGetProducts } from '@/services/productService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await apiGetProducts();
    return NextResponse.json(
      buildSuccessResponse('Products fetched successfully', response.data)
    );
  } catch (error: unknown) {
    return NextResponse.json(buildErrorResponse(error as Error), {
      status: 500,
    });
  }
}
