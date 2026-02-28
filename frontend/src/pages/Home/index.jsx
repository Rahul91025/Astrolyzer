import React from 'react';
import AstroHero from '../../components/Hero';
import DailyHoroscope from '../../components/DailyHoroscope';
import DailyRoutines from '../../components/DailyRoutines';
import AstrologyPage from '../../components/Learn';
import PricingSection from '../../components/Pricing';
import ZodiacLookup from '../../components/ZodiacLookup';
import PlanetaryOverview from '../../components/PlanetaryOverview';

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