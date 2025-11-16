"use client";

import { HomeMasthead as HomeMastheadType } from "@/sanity/types";
import { SplitTextComponent } from "@/components/atoms/SplitText";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

interface HomeMastheadProps {
    data: HomeMastheadType;
}

export function HomeMasthead({ data }: HomeMastheadProps) {
    return (
        <div data-component="home-masthead" className="md:min-h-screen pt-[8rem] md:pt-49">
            <div className="flex flex-col md:flex-row items-center gap-y-16 gap-x-24">
                <div className="flex flex-col gap-y-8">
                    {data.heading && (
                        <h1 className="text-136px leading-none uppercase font-black subt_1">
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
                    {data.links && data.links.length > 0 && (
                        <LinksWrapper links={data.links} />
                    )}
                </div>
                {data.image && (
                    <div className="relative aspect-632/424 max-w-[632px] w-full overflow-hidden border-[7px] border-white rotate-2">
                        <SanityImage
                            image={data.image}
                            priority
                            className="object-cover h-full w-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
