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

  const isContainedSection = options?.isContainedSection ?? false;
  const containedSectionBgColor = options?.containedBgColor || "none";

  const containedSectionBgClass = isContainedSection && containedSectionBgColor 
    ? bgColorMap[containedSectionBgColor as keyof typeof bgColorMap] || "" 
    : "";
  const containedSectionClasses = isContainedSection ? "rounded-[10px] px-8 py-12 md:py-20 sm:px-12 md:px-20 p-20" : "";

  const bgColor = options?.bgColor || "none";
  const paddingTop = options?.paddingTop || "none";
  const paddingBottom = options?.paddingBottom || "none";
  const marginTop = options?.marginTop || "none";
  const marginBottom = options?.marginBottom || "none";
  const overflow = options?.overflow || "hidden";

  const sectionClasses = clsx(
    bgColorMap[bgColor as keyof typeof bgColorMap],
    spacingMap.paddingTop[paddingTop as keyof typeof spacingMap.paddingTop],
    spacingMap.paddingBottom[paddingBottom as keyof typeof spacingMap.paddingBottom],
    spacingMap.marginTop[marginTop as keyof typeof spacingMap.marginTop],
    spacingMap.marginBottom[marginBottom as keyof typeof spacingMap.marginBottom],
    overflowMap[overflow as keyof typeof overflowMap]
  );
  
  const content = (
    <>
      {section.components?.map((component) => (
        <ComponentRenderer 
          key={component._key} 
          component={component} 
          bgColor={bgColor} 
          isContainedSection={isContainedSection} 
          containedBgColor={containedSectionBgColor} 
        />
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
          <div className={`flex flex-col ${spacingMap.componentSpacing[options?.componentSpacing as keyof typeof spacingMap.componentSpacing] || spacingMap.componentSpacing.default} ${containedSectionBgClass} ${containedSectionClasses}`}>
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

