import { buildErrorResponse, buildSuccessResponse } from '@/lib/apiResponse';
import { apiGetProductVariants } from '@/services/productService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        buildErrorResponse(new Error('Invalid product ID')),
        { status: 400 }
      );
    }

    const response = await apiGetProductVariants(productId);
    return NextResponse.json(
      buildSuccessResponse(
        'Product variants fetched successfully',
        response.data
      )
    );
  } catch (error: unknown) {
    return NextResponse.json(buildErrorResponse(error as Error), {
      status: 500,
    });
  }
}
