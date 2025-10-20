import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const buttonAnimatedStyles = tv({
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
const BUTTON_ANIMATED = buttonAnimatedStyles();

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function ButtonAnimated(props: ButtonAnimatedProps) {
  const { children, className: C = {}, icon = "icon-lucide--chevron-right", intent, reverse = false, ...rest } = props;
  return (
    <button className={BUTTON_ANIMATED.base({ intent, reverse, className: C.base })} data-slot="button" {...rest}>
      <div className={BUTTON_ANIMATED.unhovered({ intent, reverse, className: C.unhovered })}>
        <div className={BUTTON_ANIMATED.circle({ intent, reverse, className: C.circle })} />
        <span className={BUTTON_ANIMATED.container({ intent, reverse, className: C.container })}>{children}</span>
      </div>
      <div className={BUTTON_ANIMATED.hovered({ intent, reverse, className: C.hovered })}>
        <span>{children}</span>
        <span className={BUTTON_ANIMATED.icon({ intent, reverse, className: cn(icon, C.icon) })} />
      </div>
    </button>
  );
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type ButtonAnimatedClass = Partial<(typeof buttonAnimatedStyles)["slots"]>;
type ButtonAnimatedProps = Omit<ComponentProps<"button">, "className"> & ButtonAnimatedStyles & { icon?: string };
type ButtonAnimatedStyles = ButtonAnimatedVariants & { className?: ButtonAnimatedClass };
type ButtonAnimatedVariants = VariantProps<typeof buttonAnimatedStyles>;
