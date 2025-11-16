"use client";

import { TextCard as TextCardType } from "@/sanity/types";
import clsx from "clsx";

interface TextCardProps {
    data: TextCardType;
}

const headingFontSizeMap = {
  "16px": "text-16px",
  "40px": "text-40px"
};

export function TextCard({ data }: TextCardProps) {
    const { subheading, heading, content, textCardOptions } = data || {};
    const {
        centerAlign = false,
        centerAlignOnMobile = false,
        contentFontSize = "16px",
        headingFontSize = "40px",
        subheadingTag = "h2",
        headingTag = "h3",
    } = textCardOptions || {};

    const SubheadingTag = subheadingTag || "h2";
    const HeadingTag = headingTag || "h3";

    const alignmentClasses = clsx(
      centerAlign && !centerAlignOnMobile ? "items-center text-center" : "",
      centerAlign && centerAlignOnMobile ? "items-center text-center" : "",
      !centerAlign && centerAlignOnMobile ? "items-center text-center md:items-start md:text-left" : "",
    )
  
    return (
        <div className={`flex flex-col ${alignmentClasses}`}>
          <div className="flex flex-col">
            {data.subheading && (
                <SubheadingTag className="text-card__subheading">{data.subheading}</SubheadingTag>
            )}
            {data.heading && (
                <HeadingTag className="font-heading uppercase text-40px">{data.heading}</HeadingTag>
            )}
          </div>
            {data.content && (
                <p className="text-card__content">{data.content}</p>
            )}
        </div>
    );
}
