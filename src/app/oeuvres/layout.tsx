import { Hero, HeroContent } from "@/components/hero";
import { readWorksLayout } from "@/data/layouts";
import { WorksLayoutSets } from "./layout.sets";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function WorksLayout({ children }: LayoutProps<"/oeuvres">) {
  const { hero, sets } = readWorksLayout();

  return (
    <>
      <Hero image={hero.image} title={hero.title}>
        <HeroContent>{hero.content}</HeroContent>
      </Hero>
      <WorksLayoutSets sets={sets} />
      {children}
    </>
  );
}
