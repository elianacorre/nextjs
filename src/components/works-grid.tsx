/** biome-ignore-all lint/style/noMagicNumbers: off */
// import { default as Zoom } from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
import { Image } from "@unpic/react";
import { tv, type VariantProps } from "tailwind-variants";
import type { Works } from "@/data/works";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const worksGridStyles = tv({
  slots: {
    base: `group/list grid w-full grid-cols-1 gap-8
    sm:grid-cols-2
    lg:grid-cols-3`,
    img: "absolute size-full object-cover",
    infos: `absolute inset-0 flex flex-col justify-between bg-black/50 text-white p-5 transition-opacity duration-300 opacity-0 pointer-events-none
    group-hover/item:opacity-100`,
    item: `flex-1 transition duration-300 group/item relative inset-shadow-2xs aspect-square w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-lg
    hover:scale-none hover:blur-none 
    group-hover/list:scale-[0.9] group-hover/list:blur-sm`,
  },
});
export const WORKS_GRID = worksGridStyles();

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function WorksGrid({ className: C = {}, works }: WorksGridProps) {
  return (
    <ul className={WORKS_GRID.base({ className: C.base })}>
      {works.map((work) => (
        <li className={WORKS_GRID.item({ className: C.item })} key={work.slug}>
          {/* <Zoom zoomImg={{ ...work.image, sizes: "100vw" }}> */}
          <Image
            {...work.image}
            breakpoints={[300, 384, 470, 600, 768, 940]}
            className={WORKS_GRID.img({ className: C.img })}
            sizes="(min-width: 1536px) 470px, (min-width: 1280px) 384px, (min-width: 1024px) 300px, (min-width: 768px) 336px, (min-width: 640px) 272px, 100vw"
          />
          {/* </Zoom> */}
          <div className={WORKS_GRID.infos({ className: C.infos })}>
            <h3 className="text-center font-bold font-heading text-4xl">{work.title}</h3>
            <ul className="text-base">
              <li className="flex items-center gap-2">
                <span className="icon-lucide--palette size-4" />
                {work.media.join(", ")}
              </li>
              <li className="flex items-center gap-2">
                <span className="icon-lucide--clipboard size-4" />
                {work.material}
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
export type WorksGridProps = WorksGridStyles & { works: Works["Entity"][] };

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type WorksGridClass = Partial<(typeof worksGridStyles)["slots"]>;
export type WorksGridVariants = VariantProps<typeof worksGridStyles>;
export type WorksGridStyles = WorksGridVariants & { class?: WorksGridClass; className?: WorksGridClass };
