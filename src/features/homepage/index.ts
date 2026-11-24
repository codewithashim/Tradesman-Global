// Public API of the homepage feature. Import from "@/features/homepage" only.

export type { HomepageStats } from "./types/homepage";
export { getHomepageData, type HomepageData } from "./services/homepage-service";

export { HeroSection } from "./sections/hero-section";
export { SearchSection } from "./sections/search-section";
export { PopularTradesSection, type PopularTradeCardData } from "./sections/popular-trades-section";
export { FeaturedWorkersSection } from "./sections/featured-workers-section";
export { VideoResumeSection } from "./sections/video-resume-section";
export { HowItWorksSection } from "./sections/how-it-works-section";
export { SkillsShowcaseSection } from "./sections/skills-showcase-section";
export { DestinationsSection } from "./sections/destinations-section";
export { FinalCtaSection } from "./sections/final-cta-section";
