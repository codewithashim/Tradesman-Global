import { PageTransition } from "@/components/animations";
import {
  DestinationsSection,
  FeaturedWorkersSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  SkillsGallerySection,
  TalentIntroSection,
  VideoResumeSection,
  getHomepageData,
} from "@/features/homepage";

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <PageTransition>
      <div>
        <HeroSection
          stats={data.stats}
          globe={data.globe}
          tradeOptions={data.tradeOptions}
          countryOptions={data.countryOptions}
          experienceOptions={data.experienceOptions}
        />
        <TalentIntroSection stats={data.stats} />
        <SkillsGallerySection trades={data.popularTrades} />
        <FeaturedWorkersSection workers={data.featuredWorkers} />
        <VideoResumeSection />
        <HowItWorksSection />
        <DestinationsSection destinations={data.destinations} />
        <FinalCtaSection />
      </div>
    </PageTransition>
  );
}
