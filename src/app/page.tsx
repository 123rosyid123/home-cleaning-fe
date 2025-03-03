import { FAQ as FAQType, ServiceInclusion, WhyChooseUs } from '@/types/landingPageType';
import { ProductVariant } from '@/types/productType';
import { actionGetFAQ, actionGetServiceInclusions, actionGetWhyChooseUs } from './actions/langingPageActions';
import { actionGetProductVariants } from './actions/productActions';
import CTASection from './components/CTASection';
import FAQ from './components/FAQ';
import FeaturesSection from './components/FeaturesSection';
import HeroSection from './components/HeroSection';
import ServiceInclusionsSection from './components/ServiceInclusionsSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchData() {
  try {
    const [productVariantsResponse, serviceInclusionsResponse, whyChooseUsResponse, faqResponse] = await Promise.all([
      actionGetProductVariants('HOME_CLEANING'),
      actionGetServiceInclusions(),
      actionGetWhyChooseUs(),
      actionGetFAQ()
    ]);

    return {
      productVariants: ('data' in productVariantsResponse) ? productVariantsResponse.data as ProductVariant[] : [],
      serviceInclusions: ('data' in serviceInclusionsResponse) ? serviceInclusionsResponse.data as ServiceInclusion[] : [],
      whyChooseUs: ('data' in whyChooseUsResponse) ? whyChooseUsResponse.data as WhyChooseUs : { title: '', cards: [] },
      faq: ('data' in faqResponse) ? faqResponse.data as FAQType : { title: '', subtitle: '', faqs: [] }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      productVariants: [],
      serviceInclusions: [],
      whyChooseUs: { title: '', cards: [] },
      faq: { title: '', subtitle: '', faqs: [] }
    };
  }
}

export default async function Home() {
  const { productVariants, serviceInclusions, whyChooseUs, faq } = await fetchData();

  return (
    <div className="min-h-screen bg-base-100">
      <HeroSection />
      <FeaturesSection whyChooseUs={whyChooseUs} />
      <ServiceInclusionsSection serviceInclusions={serviceInclusions} />
      <ServicesSection productVariants={productVariants} />
      <FAQ faq={faq} />
      <CTASection />
      <Footer/>
    </div>
  );
}