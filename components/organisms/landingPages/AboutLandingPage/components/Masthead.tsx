"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

gsap.registerPlugin(useGSAP);

interface MastheadProps {
    masthead?: {
        heading?: string;
        subheading?: string;
        description?: string;
        links?: any;
        leftTopImage?: any;
        leftBottomImage?: any;
        rightTopImage?: any;
        rightBottomImage?: any;
        asset?: {
            id?: string;
            type?: "image" | "video";
            image?: {
                asset?: {
                    _ref?: string;
                    _type?: string;
                };
                [key: string]: any;
            };
            video?: string;
            videoPoster?: {
                asset?: {
                    _ref?: string;
                    _type?: string;
                };
                [key: string]: any;
            };
            videoOptions?: {
                title?: string;
                showTitleOnPoster?: boolean;
            };
        };
        mastheadMaxWidth?: number;
    };
}

export default function Masthead({ masthead }: MastheadProps) {
    const containerRef = useRef<HTMLElement>(null);
    const leftTopImageRef = useRef<HTMLDivElement>(null);
    const leftBottomImageRef = useRef<HTMLDivElement>(null);
    const rightTopImageRef = useRef<HTMLDivElement>(null);
    const rightBottomImageRef = useRef<HTMLDivElement>(null);
    const subheadingRef = useRef<HTMLHeadingElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Collect all image refs that exist
        const imageRefs = [
            leftTopImageRef.current,
            leftBottomImageRef.current,
            rightTopImageRef.current,
            rightBottomImageRef.current,
        ].filter(Boolean) as HTMLElement[];

        // Collect all text element refs that exist
        const textRefs = [
            subheadingRef.current,
            headingRef.current,
            descriptionRef.current,
            linksRef.current,
        ].filter(Boolean) as HTMLElement[];

        // Set initial states
        gsap.set(imageRefs, {
            opacity: 0,
            scale: 0.8,
        });

        gsap.set(textRefs, {
            opacity: 0,
            y: 30,
        });

        // Create timeline
        const tl = gsap.timeline();

        // Animate images with stagger
        if (imageRefs.length > 0) {
            tl.to(imageRefs, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "expo.out",
            });
        }

        // Start text animation just before images finish
        // Calculate when to start: total image duration - text animation duration
        const imageDuration = imageRefs.length > 0 ? 0.8 + (imageRefs.length - 1) * 0.15 : 0;
        const textStartTime = Math.max(0, imageDuration - 0.6);

        if (textRefs.length > 0) {
            tl.to(
                textRefs,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "expo.out",
                },
                textStartTime
            );
        }
    }, { scope: containerRef });

    if (!masthead) return null;

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center">
            <div className="container">
                <div className="flex flex-col gap-y-12 items-center text-center relative">
                    <div className="flex flex-col gap-y-4 md:gap-y-8 items-center text-center max-w-[722px] w-full mx-auto relative z-[2]" style={{
                        maxWidth: `${masthead?.mastheadMaxWidth}px`
                    }}>
                        <div className="flex flex-col">
                            {masthead?.subheading && (
                                <h1 ref={subheadingRef} className="!font-mono uppercase">{masthead?.subheading}</h1>
                            )}
                        </div>
                        {masthead?.heading && (
                            <h1 ref={headingRef} className="text-80px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: masthead.heading }} />
                        )}
                        {masthead?.description && (
                            <p ref={descriptionRef} className="font-serif font-light text-2xl md:text-4xl">
                                {masthead.description}
                            </p>
                        )}
                        {masthead?.links && (
                            <div ref={linksRef}>
                                <LinksWrapper links={masthead.links} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="absolute inset-0 h-full w-full">
                    <div className="container relative h-full">
                        {/* Four absolutely positioned images */}
                        {masthead?.leftTopImage && (
                            <div ref={leftTopImageRef} className="absolute top-40 xl:top-30 left-0 aspect-[285/186] w-full max-w-[40vw] xl:max-w-[286px] overflow-hidden">
                                <SanityImage
                                    image={masthead.leftTopImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                        {masthead?.leftBottomImage && (
                            <div ref={leftBottomImageRef} className="absolute bottom-0 left-5 lg:left-24 aspect-[219/290] w-full max-w-[30vw] md:max-w-[25vw] xl:max-w-[219px] overflow-hidden">
                                <SanityImage
                                    image={masthead.leftBottomImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                        {masthead?.rightTopImage && (
                            <div ref={rightTopImageRef} className="absolute top-20 xl:top-30 right-0 aspect-[285/186] max-w-[40vw] xl:max-w-[285px] w-full overflow-hidden">
                                <SanityImage
                                    image={masthead.rightTopImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                        {masthead?.rightBottomImage && (
                            <div ref={rightBottomImageRef} className="absolute bottom-20 lg:bottom-0 right-5 lg:right-24 aspect-[233/309] max-w-[30vw] md:max-w-[25vw] xl:max-w-[233px] w-full overflow-hidden">
                                <SanityImage
                                    image={masthead.rightBottomImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

