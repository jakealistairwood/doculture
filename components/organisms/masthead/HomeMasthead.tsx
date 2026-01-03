"use client";

import { HomeMasthead as HomeMastheadType } from "@/sanity/types";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitTextInstance } from "@/components/atoms/SplitText";
import FrameCorner from "@/components/atoms/FrameCorner";

gsap.registerPlugin(useGSAP);

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

interface HomeMastheadProps {
    data: HomeMastheadType;
}

// Helper function to extract plain text from HTML string
const stripHtml = (html: string): string => {
    if (typeof window === 'undefined') {
        // Server-side: simple regex approach
        return html.replace(/<[^>]*>/g, '').trim();
    }
    // Client-side: use DOM parser for better accuracy
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export function HomeMasthead({ data }: HomeMastheadProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const splitInstanceRef = useRef<any>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Collect all text element refs that exist
        const textRefs = [
            headingRef.current,
            contentRef.current,
            linksRef.current,
        ].filter(Boolean) as HTMLElement[];

        // Set initial states for content and links
        if (contentRef.current) {
            gsap.set(contentRef.current, {
                opacity: 0,
                y: 30,
            });
        }

        if (linksRef.current) {
            gsap.set(linksRef.current, {
                opacity: 0,
                y: 30,
            });
        }

        // Create timeline
        const tl = gsap.timeline();

        // Animate heading with SplitText if available
        if (headingRef.current && data.heading) {
            // Use official GSAP SplitText if available, otherwise use custom implementation
            if (SplitText) {
                // Official GSAP SplitText plugin
                splitInstanceRef.current = SplitText.create(headingRef.current, {
                    type: "lines",
                    linesClass: "lines-js"
                });

                // Add aria-hidden to all split lines for accessibility
                if (splitInstanceRef.current.lines) {
                    splitInstanceRef.current.lines.forEach((line: HTMLElement) => {
                        line.setAttribute('aria-hidden', 'true');
                    });
                }

                // Animate lines sliding up
                tl.from(splitInstanceRef.current.lines, {
                    duration: 0.8,
                    opacity: 0,
                    yPercent: 200,
                    stagger: 0.1,
                    ease: "expo.out",
                });
            } else {
                // Fallback: Use custom SplitTextInstance for line splitting
                splitInstanceRef.current = SplitTextInstance.create(headingRef.current, {
                    type: "lines",
                    linesClass: "lines-js"
                });

                // Add aria-hidden to all split lines for accessibility
                if (splitInstanceRef.current.lines) {
                    splitInstanceRef.current.lines.forEach((line: HTMLElement) => {
                        line.setAttribute('aria-hidden', 'true');
                    });
                }

                // Animate lines sliding up
                tl.from(splitInstanceRef.current.lines, {
                    duration: 0.8,
                    yPercent: 110,
                    stagger: 0.1,
                    ease: "expo.out",
                });
            }
        }

        // Animate content and links with stagger after heading
        const contentAndLinksRefs = [
            contentRef.current,
            linksRef.current,
        ].filter(Boolean) as HTMLElement[];

        if (contentAndLinksRefs.length > 0) {
            tl.to(
                contentAndLinksRefs,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "expo.out",
                },
                "-=0.3" // Start slightly before heading animation completes
            );
        }

        // Cleanup function
        return () => {
            if (splitInstanceRef.current && splitInstanceRef.current.revert) {
                splitInstanceRef.current.revert();
                splitInstanceRef.current = null;
            }
        };
    }, { dependencies: [data.heading, data.content, data.links], scope: containerRef });

    return (
        <div data-component="home-masthead" className="h-screen" ref={containerRef}>
            <div className="bg-off-black text-white h-full relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10">
                <div className="container">
                    <div className="flex flex-col gap-y-16 gap-x-24 relative z-[2] py-24 sm:py-16 sm:px-16">
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] top-0 left-0 opacity-50" />
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] top-0 right-0 rotate-90 opacity-50" />
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] bottom-0 right-0 rotate-180 opacity-50" />
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] bottom-0 left-0 rotate-270 opacity-50" />
                        <div className="flex flex-col items-center text-center gap-y-8">
                            {data.heading && (
                                <h1 
                                    data-split="heading"
                                    className="text-120px leading-none uppercase max-w-[700px] overflow-hidden"
                                >
                                    <span
                                        ref={headingRef}
                                        aria-hidden="true"
                                        dangerouslySetInnerHTML={{ __html: data.heading }}
                                    />
                                    <span className="sr-only">{stripHtml(data.heading)}</span>
                                </h1>
                            )}
                            {data.content && (
                                <p
                                    ref={contentRef}
                                    className="font-serif font-light text-2xl sm:text-4xl"
                                    dangerouslySetInnerHTML={{ __html: data?.content }}
                                />
                            )}
                            {data.links && data.links.length > 0 && (
                                <div ref={linksRef}>
                                    <LinksWrapper links={data.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {data.image && (
                    <div className="absolute inset-0 h-full w-full overflow-hidden">
                        <SanityImage
                            image={data.image}
                            priority
                            className="object-cover h-full w-full"
                        />
                    </div>
                )}
                <p className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] opacity-50">&#91;Scroll Down&#93;</p>
            </div>
        </div>
    );
}