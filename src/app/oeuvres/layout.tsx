import { Hero } from "@/components/hero";
import { readWorksLayout } from "@/data/layouts";
import { WorksLayoutSets } from "./layout.sets";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function WorksLayout({ children }: LayoutProps<"/oeuvres">) {
  const { hero, ...data } = readWorksLayout();
  const sets = data.sets.map((set) => ({ ...set, image: { ...set.image, src: `${set.image.src}&ar=1&fit=crop` } }));

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
