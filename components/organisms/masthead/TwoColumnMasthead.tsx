"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

gsap.registerPlugin(useGSAP);

interface TwoColumnMastheadProps {
    data: {
        subheading?: string;
        heading?: string;
        content?: string;
        image?: any;
        links?: any[];
    };
}

export function TwoColumnMasthead({ data }: TwoColumnMastheadProps) {
    const containerRef = useRef<HTMLElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Collect all text element refs that exist
        const textRefs = [
            subheadingRef.current,
            headingRef.current,
            contentRef.current,
            linksRef.current,
        ].filter(Boolean) as HTMLElement[];

        // Set initial states for text elements
        gsap.set(textRefs, {
            opacity: 0,
            y: 30,
        });

        // Set initial state for image
        if (imageRef.current) {
            gsap.set(imageRef.current, {
                opacity: 0,
                scale: 0.9,
            });
        }

        // Create timeline
        const tl = gsap.timeline();

        // Animate text elements with stagger
        if (textRefs.length > 0) {
            tl.to(textRefs, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "expo.out",
            });
        }

        // Animate image after text starts
        if (imageRef.current) {
            tl.to(
                imageRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "expo.out",
                },
                "-=0.3" // Start slightly before text animation completes
            );
        }
    }, { scope: containerRef, dependencies: [data.subheading, data.heading, data.content, data.links, data.image] });

    return (
        <section ref={containerRef} data-component="two-col-masthead" className="">
            <div className="bg-off-black text-white h-full relative overflow-hidden flex flex-col items-center justify-center pb-0 pt-20 md:pb-20">
                <div className="container">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12 lg:gap-24 items-center relative z-[2]">
                        {/* Text Column */}
                        <div className="flex flex-col items-center text-center gap-y-6 max-w-[666px]">
                            {data.subheading && (
                                <p ref={subheadingRef} className="!font-mono uppercase">
                                    {data.subheading}
                                </p>
                            )}
                            {data.heading && (
                                <h1 ref={headingRef} className="font-heading text-80px uppercase leading-[0.98]">
                                    {data.heading}
                                </h1>
                            )}
                            {data.content && (
                                <p ref={contentRef} className="font-serif font-light text-xl sm:text-2xl md:text-3xl">
                                    {data.content}
                                </p>
                            )}
                            {data.links && data.links.length > 0 && (
                                <div ref={linksRef} className="mt-4">
                                    <LinksWrapper links={data.links} />
                                </div>
                            )}
                        </div>

                        {/* Image Column */}
                        {data.image && (
                            <div ref={imageRef} className="w-full relative overflow-hidden aspect-square lg:aspect-auto lg:h-full lg:max-w-[556px]">
                                <SanityImage
                                    image={data.image}
                                    priority
                                    className="object-cover w-full h-full grayscale"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

