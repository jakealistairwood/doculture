"use client";

import { TextCard as TextCardType, BlockContent } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";
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
  darkGrey: "bg-white/[10%] text-white",
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
                <div 
                    className="text-card__content opacity-80"
                    style={{
                        maxWidth: contentMaxWidth ? `${contentMaxWidth}px` : undefined
                    }}
                >
                    <PortableText 
                        value={data.content as BlockContent} 
                        components={{
                            block: {
                                normal: ({ children }: { children: React.ReactNode }) => (
                                    <p className="mb-4 last:mb-0">{children}</p>
                                ),
                                h1: ({ children }: { children: React.ReactNode }) => (
                                    <h1 className="text-2xl md:text-3xl font-heading uppercase mb-4">{children}</h1>
                                ),
                                h2: ({ children }: { children: React.ReactNode }) => (
                                    <h2 className="text-xl md:text-2xl font-heading uppercase mb-4">{children}</h2>
                                ),
                                h3: ({ children }: { children: React.ReactNode }) => (
                                    <h3 className="text-lg md:text-xl font-heading uppercase mb-4">{children}</h3>
                                ),
                                h4: ({ children }: { children: React.ReactNode }) => (
                                    <h4 className="text-base md:text-lg font-heading uppercase mb-4">{children}</h4>
                                ),
                                blockquote: ({ children }: { children: React.ReactNode }) => (
                                    <blockquote className="border-l-4 border-current pl-4 py-2 my-4 italic">{children}</blockquote>
                                ),
                            },
                            marks: {
                                strong: ({ children }: { children: React.ReactNode }) => (
                                    <strong className="font-bold">{children}</strong>
                                ),
                                em: ({ children }: { children: React.ReactNode }) => (
                                    <em className="italic">{children}</em>
                                ),
                                link: ({ value, children }: { value: { href?: string }; children: React.ReactNode }) => {
                                    const target = value?.href?.startsWith('http') ? '_blank' : undefined;
                                    const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
                                    return (
                                        <a
                                            href={value?.href}
                                            target={target}
                                            rel={rel}
                                            className="underline hover:no-underline transition-all"
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            },
                            list: {
                                bullet: ({ children }: { children: React.ReactNode }) => (
                                    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
                                ),
                                number: ({ children }: { children: React.ReactNode }) => (
                                    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
                                ),
                            },
                            listItem: {
                                bullet: ({ children }: { children: React.ReactNode }) => (
                                    <li>{children}</li>
                                ),
                                number: ({ children }: { children: React.ReactNode }) => (
                                    <li>{children}</li>
                                ),
                            },
                            types: {
                                image: ({ value }: { value: any }) => {
                                    if (!value?.asset?._ref && !value?.asset?._id) return null;
                                    return (
                                        <div className="my-4">
                                            <SanityImage
                                                image={value}
                                                className="w-full h-auto rounded-lg"
                                            />
                                        </div>
                                    );
                                },
                            },
                        }}
                    />
                </div>
            )}
            {data.links && data.links.length > 0 && (
                <LinksWrapper links={data.links} />
            )}
        </div>
    );
}

export default TextCard