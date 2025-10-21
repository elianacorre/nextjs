import Link, { type LinkProps } from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const btnStyles = tv({
  slots: {
    base: "group/button relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background px-6 py-2 text-center font-semibold",
    circle: `size-2 rounded-full transition-all duration-300 
    group-hover/button:scale-[100.8]`,
    container: `inline-block transition-all duration-300 
    group-hover/button:opacity-0`,
    hovered: `absolute top-0 z-10 flex size-full items-center justify-center gap-2 opacity-0 transition-all duration-300
    group-hover/button:opacity-100`,
    icon: "size-5",
    unhovered: "flex items-center gap-2",
  },
  variants: {
    intent: {
      primary: {
        base: "hover:border-primary",
        circle: "bg-primary",
        hovered: "text-primary-foreground",
      },
      secondary: {
        base: "hover:border-secondary",
        circle: "bg-secondary",
        hovered: "text-secondary-foreground",
      },
    },
    reverse: {
      true: {
        container: "group-hover/button:-translate-x-12",
        hovered: "group-hover/button:-translate-x-8 translate-x-5 flex-row-reverse",
      },
      false: {
        container: "group-hover/button:translate-x-12",
        hovered: "group-hover/button:-translate-x-5 translate-x-12 flex-row",
      },
    },
  },
  defaultVariants: { intent: "primary", reverse: false },
});
const BTN = btnStyles();

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Btn(props: BtnProps) {
  const { children, className: C = {}, icon, intent, reverse, ...rest } = props;
  return (
    <button className={BTN.base({ intent, reverse, className: C.base })} {...rest}>
      <BtnContent className={C} icon={icon} intent={intent} reverse={reverse}>
        {children}
      </BtnContent>
    </button>
  );
}
type BtnProps = Omit<ComponentProps<"button">, "className"> & BtnStyles & { icon?: string };

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function BtnLink(props: BtnLinkProps) {
  const { children, className: C = {}, icon, intent, reverse, ...rest } = props;
  return (
    <Link className={BTN.base({ intent, reverse, className: C.base })} {...rest}>
      <BtnContent className={C} icon={icon} intent={intent} reverse={reverse}>
        {children}
      </BtnContent>
    </Link>
  );
}
type BtnLinkProps = PropsWithChildren<LinkProps & BtnStyles & { icon?: string }>;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
function BtnContent(props: BtnContentProps) {
  const { children, className: C = {}, icon = "icon-[lucide--chevron-right]", intent, reverse } = props;
  return (
    <>
      <div className={BTN.unhovered({ intent, reverse, className: C.unhovered })}>
        <div className={BTN.circle({ intent, reverse, className: C.circle })} />
        <span className={BTN.container({ intent, reverse, className: C.container })}>{children}</span>
      </div>
      <div className={BTN.hovered({ intent, reverse, className: C.hovered })}>
        <span>{children}</span>
        <span className={BTN.icon({ intent, reverse, className: cn(icon, C.icon) })} />
      </div>
    </>
  );
}
type BtnContentProps = PropsWithChildren<BtnStyles & { icon?: string }>;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type BtnClass = Partial<(typeof btnStyles)["slots"]>;
type BtnStyles = BtnVariants & { className?: BtnClass };
type BtnVariants = VariantProps<typeof btnStyles>;
