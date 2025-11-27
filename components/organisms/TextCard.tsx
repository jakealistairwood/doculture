"use client";

import { TextCard as TextCardType } from "@/sanity/types";
import clsx from "clsx";

interface TextCardProps {
    data: TextCardType;
    bgColor?: string;
}

const headingFontSizeMap = {
  "16px": "text-16px",
  "40px": "text-40px"
};

const subheadingBgColorMap = {
  white: "bg-[#F1F1F1] text-black/[80%]",
  black: "bg-white/[10%] text-white",
  lightGrey: "bg-white text-black/[80%]"
}

const TextCard = ({ data, bgColor }: TextCardProps) => {
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

    const subheadingBgColor = subheadingBgColorMap[bgColor] || "bg-[#F1F1F1] text-black/[80%]";

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
                <SubheadingTag className={`text-card__subheading w-fit ${subheadingAlignmentClasses} text-xs font-semibold uppercase py-2 px-[0.625rem] rounded-[3px] tracking-widest ${subheadingBgColor}`}>{data.subheading}</SubheadingTag>
            )}
            {data.heading && (
                <HeadingTag 
                  className="font-heading uppercase text-40px" 
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