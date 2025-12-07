"use client";

import { Masthead as MastheadType } from "@/sanity/types";
import { SplitTextComponent } from "@/components/atoms/SplitText";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

interface MastheadProps {
    data: MastheadType;
}

export function Masthead({ data }: MastheadProps) {
    return (
        <div data-component="masthead" className="h-screen">
            <div className="bg-black text-white h-full relative overflow-hidden flex flex-col items-center justify-center p-10">
                <div className="flex flex-col md:flex-row gap-y-16 gap-x-24 relative z-[2]">
                    <div className="flex flex-col gap-y-8">
                        {data.heading && (
                            <h1 className="text-120px leading-none uppercase subt_1 max-w-[700px]">
                                {/* <SplitTextComponent
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
                                </SplitTextComponent> */}
                                <span className="">{data?.heading}</span>
                            </h1>
                        )}
                        {data.content && (
                            <p
                                className="font-serif font-light text-4xl"
                                dangerouslySetInnerHTML={{ __html: data?.content }}
                            />
                        )}
                        {data.links && data.links.length > 0 && (
                            <LinksWrapper links={data.links} />
                        )}
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
            </div>
        </div>
    );
}
