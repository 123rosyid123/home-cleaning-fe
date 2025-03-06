import { FAQ as FAQType, Footer as FooterType, ServiceInclusion, WhyChooseUs } from '@/types/landingPageType';
import { ProductVariant } from '@/types/productType';
import { actionGetFAQ, actionGetFooter, actionGetServiceInclusions, actionGetWhyChooseUs } from './actions/langingPageActions';
import { actionGetProductVariants } from './actions/productActions';
import CTASection from './components/CTASection';
import FAQ from './components/FAQ';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ServiceInclusionsSection from './components/ServiceInclusionsSection';
import ServicesSection from './components/ServicesSection';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchData() {
  try {
    const [productVariantsResponse, serviceInclusionsResponse, whyChooseUsResponse, faqResponse, footerResponse] = await Promise.all([
      actionGetProductVariants('HOME_CLEANING'),
      actionGetServiceInclusions(),
      actionGetWhyChooseUs(),
      actionGetFAQ(),
      actionGetFooter()
    ]);

    return {
      productVariants: ('data' in productVariantsResponse) ? productVariantsResponse.data as ProductVariant[] : [],
      serviceInclusions: ('data' in serviceInclusionsResponse) ? serviceInclusionsResponse.data as ServiceInclusion[] : [],
      whyChooseUs: ('data' in whyChooseUsResponse) ? whyChooseUsResponse.data as WhyChooseUs : { title: '', cards: [] },
      faq: ('data' in faqResponse) ? faqResponse.data as FAQType : { title: '', subtitle: '', faqs: [] },
      footer: ('data' in footerResponse) ? footerResponse.data as FooterType : { company: { name: '', description: '' }, links: [], contact: { email: '', phone: '', address: [] }, social: { facebook: '', instagram: '', followText: '' }, copyright: '' }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      productVariants: [],
      serviceInclusions: [],
      whyChooseUs: { title: '', cards: [] },
      faq: { title: '', subtitle: '', faqs: [] },
      footer: { company: { name: '', description: '' }, links: [], contact: { email: '', phone: '', address: [] }, social: { facebook: '', instagram: '', followText: '' }, copyright: '' }
    };
  }
}

export default async function Home() {
  const { productVariants, serviceInclusions, whyChooseUs, faq, footer } = await fetchData();

  return (
    <div className="min-h-screen bg-base-100">
      <HeroSection />
      <FeaturesSection whyChooseUs={whyChooseUs} />
      <ServiceInclusionsSection serviceInclusions={serviceInclusions} />
      <ServicesSection productVariants={productVariants} />
      <FAQ faq={faq} />
      <CTASection />
      <Footer footer={footer} />
    </div>
  );
}