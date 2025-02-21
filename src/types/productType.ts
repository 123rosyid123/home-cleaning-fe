import { GenericResponse } from './genericResponse';

export interface PriceRange {
  min: number;
  max: number;
  gstRange: string;
}

export interface ProductVariantMetadata {
  type: string;
  priceRange: PriceRange;
  inclusions: string[];
  cleanerInfo: string;
  isRecommended: boolean;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  peak_price: number;
  offpeak_price: number;
  price_label: string;
  price_after_gst_label: string;
  is_recurring: boolean;
  metadata: ProductVariantMetadata;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
}

export type GetProductsResponse = GenericResponse<Product[]>;

export type GetProductVariantsResponse = GenericResponse<ProductVariant[]>;
