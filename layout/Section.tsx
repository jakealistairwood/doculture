import React from "react";
import { Section as SectionType } from "@/sanity/types";
import { ComponentRenderer } from "./ComponentRenderer";

interface SectionProps {
  section: SectionType;
}

const marginTopMap = {
  none: "mt-0",
  sm: "mt-10",
  md: "mt-20",
  lg: "mt-36"
}

const marginBottomMap = {
  none: "mb-0",
  sm: "mb-10",
  md: "mb-20",
  lg: "mb-36"
}

const paddingTopMap = {
  none: "pt-0",
  sm: "pt-10",
  md: "pt-20",
  lg: "pt-36"
}

const paddingBottomMap = {
  none: "pb-0",
  sm: "pb-10",
  md: "pb-20",
  lg: "pb-36"
}

export function Section({ section }: SectionProps) {
  const options = section.sectionOptions;
  console.log(options);

  const paddingTopClass = paddingTopMap[options?.paddingTop] || "";
  const paddingBottomClass = paddingBottomMap[options?.paddingBottom] || "";
  const marginTopClass = marginTopMap[options?.marginTop] || "";
  const marginBottomClass = marginBottomMap[options?.marginBottom] || "";

  const sectionClasses = `${paddingTopClass} ${paddingBottomClass} ${marginTopClass} ${marginBottomClass}`;
  
  const content = (
    <>
      {section.components?.map((component) => (
        <ComponentRenderer key={component._key} component={component} />
      ))}
    </>
  );
  
  return (
    <section 
      className={sectionClasses} 
      data-section-title={section.title}
    >
      {options?.removeContainer ? (
        content
      ) : (
        <div className="container">
          {content}
        </div>
      )}
    </section>
  );
}

