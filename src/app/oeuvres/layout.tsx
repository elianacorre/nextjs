import { Hero } from "@/components/hero";
import { readWorksLayout } from "@/data/layouts";
import { WorksLayoutSets } from "./layout.sets";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function WorksLayout({ children }: LayoutProps<"/oeuvres">) {
  const { hero, sets } = readWorksLayout();

  return (
    <>
      <Hero image={hero.image} title={hero.title}>
        {hero.content}
      </Hero>
      <WorksLayoutSets sets={sets} />
      {children}
    </>
  );
}
