import React from 'react';
import AstroHero from '../../components/features/Hero';
import DailyHoroscope from '../../components/features/DailyHoroscope';
import DailyRoutines from '../../components/features/DailyRoutines';
import AstrologyPage from '../../components/features/Learn';
import PricingSection from '../../components/features/Pricing';
import ZodiacLookup from '../../components/features/ZodiacLookup';
import PlanetaryOverview from '../../components/features/PlanetaryOverview';

const Home = () => {
  return (
    <main>
      <AstroHero />
      <DailyHoroscope />
      <DailyRoutines />
      <AstrologyPage />
      <PricingSection />
      <ZodiacLookup />
      <PlanetaryOverview />
    </main>
  );
};

export default Home;