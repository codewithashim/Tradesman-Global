import {
  DestinationsSection,
  FeaturedWorkersSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  PopularTradesSection,
  SearchSection,
  SkillsShowcaseSection,
  VideoResumeSection,
  getHomepageData,
} from "@/features/homepage";

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <>
      <HeroSection destinationCount={data.stats.destinations} />
      <SearchSection
        tradeOptions={data.tradeOptions}
        countryOptions={data.countryOptions}
        experienceOptions={data.experienceOptions}
        stats={data.stats}
      />
      <PopularTradesSection trades={data.popularTrades} />
      <FeaturedWorkersSection workers={data.featuredWorkers} />
      <VideoResumeSection />
      <HowItWorksSection />
      <SkillsShowcaseSection />
      <DestinationsSection destinations={data.destinations} />
      <FinalCtaSection />
    </>
  );
}
