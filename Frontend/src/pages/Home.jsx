import React from "react";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import WhyPost from "../Components/Whypost";
import Newevents from "../Components/Newevents";
import EventCategories from "../Components/home/EventCategories";
import Testimonials from "../Components/home/Testimonials";
import StatsCounter from "../Components/home/StatsCounter";
import Newsletter from "../Components/home/Newsletter";
import Sponsors from "../Components/home/Sponsors";
import CTABanner from "../Components/home/CTABanner";
import FAQ from "../Components/home/FAQ";

function Home() {
  return (
    <div>
      <Hero />
      <StatsCounter />
      <EventCategories />
      <HowItWorks />
      <Newevents />
      <WhyPost />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CTABanner />
      <Sponsors />
    </div>
  );
}

export default Home;
