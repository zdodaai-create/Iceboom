import BoomReveal from "@/components/Sections/BoomReveal";
import StorySequence from "@/components/Sections/StorySequence";
import FlavorExperience from "@/components/Sections/FlavorExperience";
import IngredientStory from "@/components/Sections/IngredientStory";
import WhyBoom from "@/components/Sections/WhyBoom";
import SocialProof from "@/components/Sections/SocialProof";
import StoreLocator from "@/components/Sections/StoreLocator";

export default function Home() {
  return (
    <main className="w-full bg-brand-black min-h-screen">
      <BoomReveal />
      <StorySequence />
      <FlavorExperience />
      <IngredientStory />
      <WhyBoom />
      <SocialProof />
      <StoreLocator />
    </main>
  );
}
