"use client";

import { TextCard as TextCardType } from "@/sanity/types";
import clsx from "clsx";

interface TextCardProps {
    data: TextCardType;
    bgColor?: string;
    isContainedSection: boolean;
    containedBgColor: string;
}

const headingFontSizeMap = {
  "16px": "text-16px",
  "40px": "text-40px",
  "80px": "text-80px !leading-[1.1]",
  "100px": "text-100px",
  "120px": "text-120px"
};

const subheadingBgColorMap = {
  white: "bg-[#F1F1F1] text-black/[80%]",
  black: "bg-white/[10%] text-white",
  lightGrey: "bg-white text-black/[80%]",
  darkGrey: "bg-white/[10%] text-off-black",
  offBlack: "bg-white/[10%] text-white"
}

const TextCard = ({ data, bgColor, isContainedSection, containedBgColor }: TextCardProps) => {
    const { textCardOptions } = data || {};
    const {
        centerAlign = false,
        centerAlignOnMobile = false,
        contentFontSize = "16px",
        headingFontSize = "40px",
        subheadingTag = "h2",
        headingTag = "h3",
        headingMaxWidth,
        contentMaxWidth
    } = textCardOptions || {};

    const SubheadingTag = subheadingTag || "h2";
    const HeadingTag = headingTag || "h3";

    const headingFontSizeClass = headingFontSizeMap[headingFontSize] || "text-40px";

    const subheadingBgColor = subheadingBgColorMap[bgColor] || "bg-[#F1F1F1] text-black/[80%]";
    const containedSubheadingBgColor = subheadingBgColorMap[containedBgColor] || "bg-[#F1F1F1] text-black/[80%]";

    const subheadingBg = isContainedSection ? containedSubheadingBgColor : subheadingBgColor;

    const alignmentClasses = clsx(
      centerAlign && !centerAlignOnMobile ? "items-center text-center" : "",
      centerAlign && centerAlignOnMobile ? "items-center text-center" : "",
      !centerAlign && centerAlignOnMobile ? "items-center text-center md:items-start md:text-left" : "",
    );

    const subheadingAlignmentClasses = clsx(
      centerAlign && "mx-auto",
      !centerAlign && centerAlignOnMobile && "mx-auto md:mx-0",
      !centerAlign && !centerAlignOnMobile && "mx-0",
    );
  
    return (
        <div className={`flex flex-col gap-y-6 ${alignmentClasses}`}>
          <div className="flex flex-col gap-y-6">
            {data.subheading && (
                <SubheadingTag className={`text-card__subheading w-fit ${subheadingAlignmentClasses} text-xs font-semibold uppercase py-2 px-[0.625rem] rounded-[3px] tracking-widest ${subheadingBg}`}>{data.subheading}</SubheadingTag>
            )}
            {data.heading && (
                <HeadingTag 
                  className={`font-heading font-medium uppercase -tracking-[0.01em] ${headingFontSizeClass}`}
                  dangerouslySetInnerHTML={{ __html: data.heading }}
                  style={{
                    maxWidth: `${headingMaxWidth}px`
                  }}
                />
            )}
          </div>
            {data.content && (
                <p className="text-card__content opacity-80" style={{
                  maxWidth: `${contentMaxWidth}px`
                }}>{data.content}</p>
            )}
        </div>
    );
}

export default TextCard