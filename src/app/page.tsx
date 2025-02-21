import { ProductVariant } from '@/types/productType';
import { actionGetProductVariants } from './actions/landingPageActions';
import CTASection from './components/CTASection';
import FAQ from './components/FAQ';
import FeaturesSection from './components/FeaturesSection';
import HeroSection from './components/HeroSection';
import ServiceInclusionsSection from './components/ServiceInclusionsSection';
import ServicesSection from './components/ServicesSection';

export default async function Home() {
  let productVariants: ProductVariant[] = [];
  try {
    const productVariantsResponse = await actionGetProductVariants();
    if ('data' in productVariantsResponse) {
      productVariants = productVariantsResponse.data as ProductVariant[];
    } else {
      console.error('Error fetching product variants:', productVariantsResponse);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-base-100">
      <HeroSection />
      <FeaturesSection />
      <ServiceInclusionsSection />
      <ServicesSection productVariants={productVariants} />
      <FAQ />
      <CTASection />
    </div>
  );
}