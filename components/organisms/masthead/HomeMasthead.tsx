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

export function HomeMasthead({ data }: HomeMastheadProps) {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const splitInstanceRef = useRef<any>(null);

    useGSAP(() => {
        if (!headingRef.current || !data.heading) return;

        // Use official GSAP SplitText if available, otherwise use custom implementation
        if (SplitText) {
            // Official GSAP SplitText plugin
            splitInstanceRef.current = SplitText.create(headingRef.current, {
                type: "lines",
                linesClass: "lines-js"
            });

            // Animate lines sliding up
            gsap.from(splitInstanceRef.current.lines, {
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

            // Animate lines sliding up
            gsap.from(splitInstanceRef.current.lines, {
                duration: 0.8,
                yPercent: 110,
                stagger: 0.1,
                ease: "expo.out",
            });
        }

        // Cleanup function
        return () => {
            if (splitInstanceRef.current && splitInstanceRef.current.revert) {
                splitInstanceRef.current.revert();
                splitInstanceRef.current = null;
            }
        };
    }, { dependencies: [data.heading], scope: headingRef });

    return (
        <div data-component="home-masthead" className="h-screen">
            <div className="bg-off-black text-white h-full relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10">
                <div className="container">
                    <div className="flex flex-col gap-y-16 gap-x-24 relative z-[2] py-24 sm:py-16 sm:px-16">
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] top-0 left-0" />
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] top-0 right-0 rotate-90" />
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] bottom-0 right-0 rotate-180" />
                        <FrameCorner className="absolute aspect-square w-[40px] sm:w-[64px] bottom-0 left-0 rotate-270" />
                        <div className="flex flex-col items-center text-center gap-y-8">
                            {data.heading && (
                                <h1 
                                    ref={headingRef}
                                    data-split="heading"
                                    className="text-120px leading-none uppercase max-w-[700px] overflow-hidden"
                                >
                                    {data.heading}
                                </h1>
                            )}
                            {data.content && (
                                <p
                                    className="font-serif font-light text-2xl sm:text-4xl"
                                    dangerouslySetInnerHTML={{ __html: data?.content }}
                                />
                            )}
                            {data.links && data.links.length > 0 && (
                                <LinksWrapper links={data.links} />
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