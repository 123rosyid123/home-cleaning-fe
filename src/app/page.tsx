'use client';

import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ServiceInclusionsSection from './components/ServiceInclusionsSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/FAQ';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <HeroSection />
      <FeaturesSection />
      <ServiceInclusionsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CTASection />
    </div>
  );
}