/** biome-ignore-all lint/style/noMagicNumbers: off */
"use client";

import { Image } from "@unpic/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { tv } from "tailwind-variants";
import { ButtonAnimated } from "@/components/button-animated";
import { Section, SectionContent, SectionMain, SectionTitle } from "@/components/section";
import type { Sets } from "@/data/sets";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const WORKS = tv({
  slots: {
    base: `min-h-[470px]
    lg:min-h-[500px] lg:items-stretch lg:gap-20
    xl:min-h-auto`,
    aside: `relative hidden flex-none aspect-square self-center
    lg:flex lg:w-xs
    xl:w-sm 
    2xl:w-md`,
    description: `flex flex-1 flex-col justify-center gap-8 transition
    starting:translate-x-10 starting:opacity-0`,
    figure: "-translate-z-96 absolute z-10 size-full scale-90 overflow-hidden rounded-3xl bg-neutral-200 opacity-80 shadow-2xl transition",
    image: "size-full object-cover",
    main: "flex-1 justify-between",
    nav: "flex w-full justify-between",
    title: `text-2xl 
    sm:text-4xl 
    2xl:text-5xl`,
  },
  variants: {
    active: {
      true: {
        figure: "translate-z-0 z-40 scale-100 opacity-100",
      },
    },
  },
})();

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function WorksLayoutSets({ sets }: WorksLayoutSetsProps) {
  const { slug } = useParams();
  const count = useMemo(() => sets.length, [sets]);
  const activeIndex = useMemo(() => sets.findIndex((set) => set.slug === slug), [slug, sets]);
  const activeSet = useMemo(() => sets[activeIndex], [activeIndex, sets]);
  const nextLink = useMemo(() => `/oeuvres/${sets[(activeIndex + 1) % count]?.slug}`, [activeIndex, count, sets]);
  const previousLink = useMemo(() => `/oeuvres/${sets[(activeIndex + count - 1) % count]?.slug}`, [activeIndex, count, sets]);

  return (
    activeSet && (
      <Section className={{ container: WORKS.base() }} intent="secondary">
        <aside className={WORKS.aside()}>
          {sets.map((set, i) => {
            const { height: _, ...r } = set.image;
            return (
              <figure
                className={WORKS.figure({ active: i === activeIndex })}
                key={set.slug}
                style={{ rotate: `${((i - activeIndex) * 45) / count}deg` }}
              >
                <Image
                  {...r}
                  aspectRatio={1}
                  className={WORKS.image()}
                  operations={{ imagekit: { f: "avif" } }}
                  sizes="(min-width: 1536px) 448px, (min-width: 1280px) 384px, (min-width: 1024px) 320px, 1px"
                />
              </figure>
            );
          })}
        </aside>
        <SectionMain className={WORKS.main()}>
          <div className={WORKS.description()} key={activeSet.slug}>
            <SectionTitle className={{ titleRow: WORKS.title() }} intent="secondary" title={["Collection", activeSet.title]} />
            <SectionContent>{activeSet.content}</SectionContent>
          </div>
          <div className={WORKS.nav()}>
            <ButtonAnimated icon="icon-lucide--chevron-left" intent="secondary" reverse>
              <Link href={previousLink}>Précédente</Link>
            </ButtonAnimated>
            <ButtonAnimated intent="secondary">
              <Link href={nextLink}>Suivante</Link>
            </ButtonAnimated>
          </div>
        </SectionMain>
      </Section>
    )
  );
}
export type WorksLayoutSetsProps = { sets: Sets["Entity"][] };
