import React from "react";
import { Section as SectionType } from "@/sanity/types";
import { ComponentRenderer } from "./ComponentRenderer";
import clsx from "clsx";

interface SectionProps {
  section: SectionType;
}

const spacingMap = {
  marginTop: {
    none: "mt-0",
    sm: "mt-10",
    md: "mt-20",
    lg: "mt-36",
  },
  marginBottom: {
    none: "mb-0",
    sm: "mb-10",
    md: "mb-20",
    lg: "mb-36",
  },
  paddingTop: {
    none: "pt-0",
    sm: "pt-10",
    md: "pt-20",
    lg: "pt-36",
  },
  paddingBottom: {
    none: "pb-0",
    sm: "pb-10",
    md: "pb-20",
    lg: "pb-36",
  },
  componentSpacing: {
    default: 'gap-y-12 md:gap-y-20',
    sm: 'gap-y-12',
    md: 'gap-y-12 md:gap-y-20'
  }
} as const;

const bgColorMap = {
  none: 'bg-transparent',
  black: 'bg-black text-white',
  white: 'bg-white text-black',
  lightGrey: 'bg-light-grey text-black',
  darkGrey: 'bg-dark-grey text-white',
  offBlack: 'bg-off-black text-white'
} as const;

const overflowMap = {
  hidden: 'overflow-hidden',
  visible: 'overflow-visible'
};

export function Section({ section }: SectionProps) {
  const options = section.sectionOptions;

  const isContainedSection = options?.isContainedSection;
  const containedSectionBgColor = options?.containedBgColor;

  const containedSectionBgClass = isContainedSection ? bgColorMap[containedSectionBgColor] : "";
  const containedSectionClasses = isContainedSection ? "rounded-[10px] p-20" : "";

  const sectionClasses = clsx(
    bgColorMap[options?.bgColor],
    spacingMap.paddingTop[options?.paddingTop],
    spacingMap.paddingBottom[options?.paddingBottom],
    spacingMap.marginTop[options?.marginTop],
    spacingMap.marginBottom[options?.marginBottom],
    overflowMap[options?.overflow]
  );
  
  const content = (
    <>
      {section.components?.map((component) => (
        <ComponentRenderer key={component._key} component={component} bgColor={options?.bgColor} isContainedSection={isContainedSection} containedBgColor={containedSectionBgColor} />
      ))}
    </>
  );
  
  return (
    <section 
      className={sectionClasses} 
      data-section-title={section.title}
      id={options?.id}
    >
      {options?.removeContainer ? (
        content
      ) : (
        <div className="container">
          <div className={`flex flex-col ${spacingMap.componentSpacing[options?.componentSpacing] || ""} ${containedSectionBgClass} ${containedSectionClasses}`}>
            {content}
          </div>
        </div>
      )}
      {options?.addBottomDivider && (
        <>
          {options?.removeContainer ? (
            <div className="h-[1px] w-full bg-white/10" />
          ) : (
            <div className="container">
              <div className="h-[1px] w-full bg-white/10" />
            </div>
          )}
        </>
      )}
    </section>
  );
}

