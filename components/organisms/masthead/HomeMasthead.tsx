"use client";

import React from "react";
import { HomeMasthead as HomeMastheadType } from "@/sanity/types";
import Image from "next/image";
import { SplitTextComponent } from "@/components/atoms/SplitText";

interface HomeMastheadProps {
    data: HomeMastheadType;
}

export function HomeMasthead({ data }: HomeMastheadProps) {
    return (
        <div data-component="home-masthead" className="min-h-screen pt-40">
            <div className="flex items-center gap-x-24">
                <div className="flex flex-col gap-y-8">
                    {data.heading && (
                        <h1 className="text-[9rem] leading-[1] -tracking-[0.01em] uppercase font-black subt_1">
                            <SplitTextComponent
                                options={{
                                    type: "lines,words",
                                    linesClass: "lines-js",
                                    wordsClass: "word-js",
                                }}
                                animationOptions={{
                                    scrollTrigger: {
                                        start: "top 50%",
                                        trigger: ".subt_1",
                                    },
                                    duration: 1.8,
                                    yPercent: 100,
                                    ease: "expo.out",
                                    stagger: 0.06,
                                }}
                            >
                                {data.heading}
                            </SplitTextComponent>
                            <span className="sr-only">{data?.heading}</span>
                        </h1>
                    )}
                    {data.content && (
                        <p
                            className="text-xl text-[#F2F3FF]/70 font-medium"
                            dangerouslySetInnerHTML={{ __html: data?.content }}
                        />
                    )}
                </div>
                {data.image && (
                    <div className="relative aspect-[632/424] max-w-[632px] w-full overflow-hidden border-2 border-white rotate-2">
                        {/* Image will be rendered here */}
                    </div>
                )}
            </div>
        </div>
    );
}
