import { Image } from "@unpic/react";
import type { Transition } from "motion/react";
import type { ComponentProps, PropsWithChildren } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { Images } from "@/data/images";
import { SectionTitleEffect } from "./section.title-effect";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const sectionStyles = tv({
  slots: {
    base: "relative",
    container: `container mx-auto w-full flex flex-col items-center gap-8 px-4 py-8 
    sm:px-8 
    lg:flex-row lg:items-start`,
    content: `flex flex-col gap-8 text-balance text-center font-light 
    sm:text-lg 
    lg:text-start 
    2xl:text-xl`,
    figure: `relative hidden aspect-square w-full flex-none rounded-2xl border-[12px] border-white bg-neutral-200 shadow-2xl outline-1 outline-neutral-200 
    md:border-[16px] 
    lg:flex lg:w-md lg:transition-transform 
    xl:w-xl 
    2xl:w-2xl`,
    image: "size-full object-cover",
    main: `flex flex-col items-center gap-8 w-full 
    lg:items-start`,
    title: `flex flex-col items-center font-extrabold text-4xl 
    sm:text-6xl 
    lg:items-start 
    2xl:text-7xl`,
    titleRow: "relative w-fit",
    titleRowEffect: "pointer-events-none absolute inset-0 z-0",
    titleRowPointer: "size-5",
    titleRowPointerWrapper: "pointer-events-none absolute opacity-0",
    titleRowRectangle: "-rotate-2 absolute inset-0 size-0 translate-y-1 rounded-2xl",
    titleRowText: "relative z-10 text-white",
  },
  variants: {
    intent: {
      default: {
        titleRowPointer: "text-primary",
        titleRowRectangle: "bg-primary",
      },
      primary: {
        base: "bg-primary/40",
        main: "bg-primary/40",
        titleRowPointer: "text-primary",
        titleRowRectangle: "bg-primary",
      },
      secondary: {
        base: "bg-accent",
        main: "bg-accent",
        titleRowPointer: "text-secondary",
        titleRowRectangle: "bg-secondary",
      },
    },
    reverse: {
      true: {
        figure: "lg:-rotate-6 lg:-translate-8 lg:hover:-rotate-8",
      },
      false: {
        figure: "lg:-translate-y-8 lg:translate-x-8 lg:rotate-6 lg:hover:rotate-8",
      },
    },
  },
});
export const SECTION = sectionStyles();

// TRANSITIONS -----------------------------------------------------------------------------------------------------------------------------
export const SECTION_T = {
  titleRowEffect: { duration: 0.5, ease: "easeOut" },
  titleRowPointerWrapper: { opacity: { duration: 0.1, ease: "easeInOut" }, duration: 1, ease: "easeInOut" },
  titleRowRectangle: { duration: 1, ease: "easeInOut" },
} satisfies Record<string, Transition>;

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function Section({ children, className: C = {}, intent = "default", reverse, ...props }: SectionProps) {
  return (
    <section {...props} className={SECTION.base({ intent, reverse, className: C.base })}>
      <div className={SECTION.container({ intent, reverse, className: C.container })}>{children}</div>
    </section>
  );
}
type SectionProps = PropsWithChildren<
  Omit<ComponentProps<"section">, "className"> & SectionVariants & { className?: Pick<SectionClass, "base" | "container"> }
>;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function SectionContent({ children, className, intent, reverse, ...props }: SectionContentProps) {
  return (
    <p {...props} className={SECTION.content({ className, intent, reverse })}>
      {children}
    </p>
  );
}
type SectionContentProps = PropsWithChildren<ComponentProps<"p"> & SectionVariants>;

// IMAGE -----------------------------------------------------------------------------------------------------------------------------------
export function SectionImage({ className: C = {}, image, intent, reverse = false, ...props }: SectionImageProps) {
  const { height: _, ...r } = image;
  return (
    <figure {...props} className={SECTION.figure({ intent, reverse, className: C.figure })}>
      <Image
        {...r}
        aspectRatio={1}
        className={SECTION.image({ intent, reverse, className: C.image })}
        operations={{ imagekit: { f: "avif" } }}
        sizes="(min-width: 1536px) 724px, (min-width: 1280px) 612px, (min-width: 1024px) 406px, (min-width: 768px) 670px, (min-width: 640px) 576px, 100vw"
      />
    </figure>
  );
}
type SectionImageProps = Omit<ComponentProps<"figure">, "className"> &
  SectionVariants & {
    className?: Pick<SectionClass, "figure" | "image">;
    image: Images["Entity"];
  };

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SectionMain({ children, className, intent, reverse, ...props }: SectionMainProps) {
  return (
    <main {...props} className={SECTION.main({ className, intent, reverse })}>
      {children}
    </main>
  );
}
type SectionMainProps = PropsWithChildren<ComponentProps<"main"> & SectionVariants>;

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export function SectionTitle({ className: C = {}, intent = "primary", reverse, title, ...props }: SectionTitleProps) {
  return (
    <h2 {...props} className={SECTION.title({ intent, reverse, className: C.title })}>
      <span>{title[0]}</span>
      <SectionTitleEffect className={C} intent={intent} reverse={reverse} text={title[1]} />
    </h2>
  );
}

export type SectionTitleProps = Omit<ComponentProps<"h2">, "className" | "title"> &
  SectionVariants & {
    className?: Pick<
      SectionClass,
      "title" | "titleRow" | "titleRowEffect" | "titleRowPointer" | "titleRowPointerWrapper" | "titleRowRectangle" | "titleRowText"
    >;
    title: string[];
  };

// POINTER ---------------------------------------------------------------------------------------------------------------------------------
export const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    // className="stroke-current fill-current stroke-1 size-4"
    {...props}
    aria-hidden="true"
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
  </svg>
);

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type SectionClass = Partial<(typeof sectionStyles)["slots"]>;
export type SectionVariants = VariantProps<typeof sectionStyles>;
