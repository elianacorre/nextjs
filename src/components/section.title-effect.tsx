"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pointer, SECTION, SECTION_T, type SectionClass, type SectionVariants } from "./section";

// EFFECT ----------------------------------------------------------------------------------------------------------------------------------
export function SectionTitleEffect({ className: C = {}, intent, reverse, text }: SectionTitleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className={SECTION.titleRow({ intent, reverse, className: C.titleRow })} ref={containerRef}>
      <span className={SECTION.titleRowText({ intent, reverse, className: C.titleRowText })}>{text}</span>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className={SECTION.titleRowEffect({ intent, reverse, className: C.titleRowEffect })}
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          transition={SECTION_T.titleRowEffect}
        >
          <motion.div
            className={SECTION.titleRowRectangle({ intent, reverse, className: C.titleRowRectangle })}
            transition={SECTION_T.titleRowRectangle}
            whileInView={dimensions}
          />
          <motion.div
            className={SECTION.titleRowPointerWrapper({ intent, reverse, className: C.titleRowPointerWrapper })}
            style={{ rotate: -90 }}
            transition={SECTION_T.titleRowPointerWrapper}
            // biome-ignore lint/style/noMagicNumbers: off
            whileInView={{ opacity: 1, x: dimensions.width + 4, y: dimensions.height + 4 }}
          >
            <Pointer className={SECTION.titleRowPointer({ intent, reverse, className: C.titleRowPointer })} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
export type SectionTitleEffectProps = SectionVariants & {
  className?: Pick<
    SectionClass,
    "titleRow" | "titleRowEffect" | "titleRowPointer" | "titleRowPointerWrapper" | "titleRowRectangle" | "titleRowText"
  >;
  text?: string;
};
