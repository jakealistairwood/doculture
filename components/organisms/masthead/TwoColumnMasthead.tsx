"use client";

import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

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
    return (
        <section data-component="two-col-masthead" className="">
            <div className="bg-off-black text-white h-full relative overflow-hidden flex flex-col items-center justify-center py-20">
                <div className="container">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12 lg:gap-24 items-center relative z-[2]">
                        {/* Text Column */}
                        <div className="flex flex-col items-center text-center gap-y-6 max-w-[666px]">
                            {data.subheading && (
                                <p className="!font-mono uppercase">
                                    {data.subheading}
                                </p>
                            )}
                            {data.heading && (
                                <h1 className="font-heading text-80px uppercase leading-[0.98]">
                                    {data.heading}
                                </h1>
                            )}
                            {data.content && (
                                <p className="font-serif font-light text-xl sm:text-2xl md:text-3xl">
                                    {data.content}
                                </p>
                            )}
                            {data.links && data.links.length > 0 && (
                                <div className="mt-4">
                                    <LinksWrapper links={data.links} />
                                </div>
                            )}
                        </div>

                        {/* Image Column */}
                        {data.image && (
                            <div className="w-full relative overflow-hidden aspect-square lg:aspect-auto lg:h-full lg:max-w-[556px]">
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

