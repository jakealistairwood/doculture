"use client";

import { TextCard as TextCardType, BlockContent } from "@/sanity/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { SplitTextInstance } from "@/components/atoms/SplitText";

gsap.registerPlugin(useGSAP);

// Try to import ScrollTrigger (premium plugin)
let ScrollTrigger: any = null;
if (typeof window !== 'undefined') {
    try {
        ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
        if (ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }
    } catch (e) {
        // ScrollTrigger not available
    }
}

// Try to import official GSAP SplitText plugin (premium)
let SplitText: any = null;
if (typeof window !== 'undefined') {
    try {
        SplitText = require('gsap/SplitText').SplitText;
        if (SplitText) {
            gsap.registerPlugin(SplitText);
        }
    } catch (e) {
        // Official plugin not available, will use custom SplitTextInstance
    }
}

// Extract types from BlockContent
type BlockContentImage = Extract<BlockContent[number], { _type: "image" }>;

interface TextCardProps {
    data: TextCardType;
    bgColor?: string;
    isContainedSection: boolean;
    containedBgColor: string;
}

const headingFontSizeMap: Record<string, string> = {
  "24px": "text-24px",
  "40px": "text-40px",
  "80px": "text-80px !leading-[1.1]",
  "100px": "text-100px",
  "120px": "text-120px"
};

const subheadingBgColorMap: Record<string, string> = {
  white: "bg-[#F1F1F1] text-black/[80%]",
  black: "bg-white/[10%] text-white",
  lightGrey: "bg-white text-black/[80%]",
  darkGrey: "bg-white/[10%] text-white",
  offBlack: "bg-white/[10%] text-white"
}

const listTypeMap: Record<string, string> = {
  bullet: 'prose-bullet',
  tick: 'prose-tick'
};

const TextCard = ({ data, bgColor, isContainedSection, containedBgColor }: TextCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const splitInstanceRef = useRef<any>(null);

    const { textCardOptions } = data || {};
    const {
        centerAlign = false,
        centerAlignOnMobile = false,
        contentFontSize = "16px",
        listType = "bullet",
        headingFontSize = "40px",
        subheadingTag = "h2",
        headingTag = "h3",
        headingMaxWidth,
        contentMaxWidth
    } = textCardOptions || {};

    const SubheadingTag = subheadingTag || "h2";
    const HeadingTag = headingTag || "h3";

    const headingFontSizeClass = headingFontSizeMap[headingFontSize || "40px"] || "text-40px";

    const subheadingBgColor = (bgColor && bgColor in subheadingBgColorMap) 
        ? subheadingBgColorMap[bgColor] 
        : "bg-[#F1F1F1] text-black/[80%]";
    const containedSubheadingBgColor = (containedBgColor && containedBgColor in subheadingBgColorMap)
        ? subheadingBgColorMap[containedBgColor]
        : "bg-[#F1F1F1] text-black/[80%]";

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

    const proseListType = listTypeMap[listType || "bullet"] || "prose-bullet";

    // Animate heading with same animation as HomeMasthead
    useGSAP(() => {
        if (!headingRef.current || !data.heading || !containerRef.current) return;

        // Use official GSAP SplitText if available, otherwise use custom implementation
        if (SplitText) {
            // Official GSAP SplitText plugin
            splitInstanceRef.current = SplitText.create(headingRef.current, {
                type: "lines",
                linesClass: "lines-js"
            });

            // Set initial state for lines
            gsap.set(splitInstanceRef.current.lines, {
                opacity: 0,
                yPercent: 200
            });

            // Animate lines sliding up with ScrollTrigger
            const animConfig: any = {
                opacity: 1,
                yPercent: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "expo.out",
            };

            if (ScrollTrigger) {
                animConfig.scrollTrigger = {
                    trigger: containerRef.current,
                    start: "top 80%",
                };
            }

            gsap.to(splitInstanceRef.current.lines, animConfig);
        } else {
            // Fallback: Use custom SplitTextInstance for line splitting
            splitInstanceRef.current = SplitTextInstance.create(headingRef.current, {
                type: "lines",
                linesClass: "lines-js"
            });

            // Set initial state for lines
            gsap.set(splitInstanceRef.current.lines, {
                yPercent: 110
            });

            // Animate lines sliding up with ScrollTrigger
            const animConfig: any = {
                yPercent: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "expo.out",
            };

            if (ScrollTrigger) {
                animConfig.scrollTrigger = {
                    trigger: containerRef.current,
                    start: "top 80%",
                };
            }

            gsap.to(splitInstanceRef.current.lines, animConfig);
        }

        // Cleanup function
        return () => {
            if (splitInstanceRef.current && splitInstanceRef.current.revert) {
                splitInstanceRef.current.revert();
                splitInstanceRef.current = null;
            }
        };
    }, { dependencies: [data.heading], scope: containerRef });

    // Animate content and links with stagger and fade-in
    useGSAP(() => {
        if (!containerRef.current) return;

        const elements: (HTMLElement | null)[] = [];
        
        if (contentRef.current) {
            elements.push(contentRef.current);
        }
        if (linksRef.current) {
            elements.push(linksRef.current);
        }

        if (elements.length === 0) return;

        // Set initial state
        gsap.set(elements, {
            opacity: 0,
            y: 20
        });

        // Animate with stagger
        // Content should animate to 0.8 opacity to match the opacity-80 class
        const contentElement = contentRef.current;
        const linksElement = linksRef.current;
        
        if (contentElement) {
            const contentAnimConfig: any = {
                opacity: 0.8,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: data.heading ? 0.4 : 0
            };

            if (ScrollTrigger) {
                contentAnimConfig.scrollTrigger = {
                    trigger: containerRef.current,
                    start: "top 80%",
                };
            }

            gsap.to(contentElement, contentAnimConfig);
        }
        
        if (linksElement) {
            const linksAnimConfig: any = {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: data.heading ? (contentElement ? 0.6 : 0.4) : (contentElement ? 0.2 : 0)
            };

            if (ScrollTrigger) {
                linksAnimConfig.scrollTrigger = {
                    trigger: containerRef.current,
                    start: "top 80%",
                };
            }

            gsap.to(linksElement, linksAnimConfig);
        }
    }, { dependencies: [data.content, data.links], scope: containerRef });
  
    return (
        <div ref={containerRef} className={`flex flex-col gap-y-6 ${alignmentClasses}`}>
          <div className="flex flex-col gap-y-6">
            {data.subheading && (
                <SubheadingTag className={`text-card__subheading w-fit ${subheadingAlignmentClasses} text-xs font-semibold uppercase py-2 px-[0.625rem] rounded-[3px] tracking-widest ${subheadingBg}`}>{data.subheading}</SubheadingTag>
            )}
            {data.heading && React.createElement(
                HeadingTag,
                {
                    ref: headingRef,
                    className: `font-heading font-medium uppercase -tracking-[0.01em] ${headingFontSizeClass} overflow-hidden`,
                    dangerouslySetInnerHTML: { __html: data.heading },
                    style: {
                        maxWidth: `${headingMaxWidth}px`
                    }
                }
            )}
          </div>
            {data.content && (
                <div 
                    ref={contentRef}
                    className={`text-card__content ${proseListType} opacity-80`}
                    style={{
                        maxWidth: contentMaxWidth ? `${contentMaxWidth}px` : undefined
                    }}
                >
                    <PortableText 
                        value={data.content as BlockContent} 
                        components={{
                            block: {
                                normal: ({ children }: { children?: React.ReactNode }) => (
                                    <p className="mb-4 last:mb-0">{children}</p>
                                ),
                                h1: ({ children }: { children?: React.ReactNode }) => (
                                    <h1 className="text-2xl md:text-3xl font-heading uppercase mb-4">{children}</h1>
                                ),
                                h2: ({ children }: { children?: React.ReactNode }) => (
                                    <h2 className="text-xl md:text-2xl font-heading uppercase mb-4">{children}</h2>
                                ),
                                h3: ({ children }: { children?: React.ReactNode }) => (
                                    <h3 className="text-lg md:text-xl font-heading uppercase mb-4">{children}</h3>
                                ),
                                h4: ({ children }: { children?: React.ReactNode }) => (
                                    <h4 className="text-base md:text-lg font-heading uppercase mb-4">{children}</h4>
                                ),
                                blockquote: ({ children }: { children?: React.ReactNode }) => (
                                    <blockquote className="border-l-4 border-current pl-4 py-2 my-4 italic">{children}</blockquote>
                                ),
                            },
                            marks: {
                                strong: ({ children }: { children?: React.ReactNode }) => (
                                    <strong className="font-bold">{children}</strong>
                                ),
                                em: ({ children }: { children?: React.ReactNode }) => (
                                    <em className="italic">{children}</em>
                                ),
                                link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
                                    const href = value?.href;
                                    const target = href?.startsWith('http') ? '_blank' : undefined;
                                    const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
                                    return (
                                        <a
                                            href={href}
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
                                bullet: ({ children }: { children?: React.ReactNode }) => (
                                    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
                                ),
                                number: ({ children }: { children?: React.ReactNode }) => (
                                    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
                                ),
                            },
                            listItem: {
                                bullet: ({ children }: { children?: React.ReactNode }) => (
                                    <li>{children}</li>
                                ),
                                number: ({ children }: { children?: React.ReactNode }) => (
                                    <li>{children}</li>
                                ),
                            },
                            types: {
                                image: ({ value }: { value: BlockContentImage }) => {
                                    if (!value?.asset?._ref) return null;
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
                        } as PortableTextComponents}
                    />
                </div>
            )}
            {data.links && data.links.length > 0 && (
                <div ref={linksRef}>
                    <LinksWrapper links={data.links} />
                </div>
            )}
        </div>
    );
}

export default TextCard