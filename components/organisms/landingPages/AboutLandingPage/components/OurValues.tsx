"use client";

import SanityImage from "@/components/atoms/SanityImage";

interface OurValuesProps {
    ourValues?: {
        heading?: string;
        values?: Array<{
            icon?: {
                asset?: any;
                altText?: string;
            };
            heading?: string;
            description?: string;
        }>;
    };
}

export default function OurValues({ ourValues }: OurValuesProps) {
    if (!ourValues) return null;

    return (
        <section className="py-12 lg:py-36">
            <div className="container">
                <div className="flex flex-col gap-y-12 md:gap-y-20">
                    {ourValues.heading && (
                        <h2 className="font-heading text-80px uppercase leading-[0.94] text-center" dangerouslySetInnerHTML={{ __html: ourValues?.heading }} />
                    )}
                    {ourValues.values && ourValues.values.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {ourValues.values.map((value, index) => (
                                <div key={index} className="flex flex-col gap-y-16 gap-y-4 p-8 border border-white/10">
                                    {value.icon && (
                                        <div className="w-16 h-16 relative aspect-square flex items-center justify-center bg-[#242020] rounded-lg">
                                            <div className="flex items-center justify-center flex-none">
                                                <SanityImage
                                                    image={value.icon}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-y-4 mt-auto">
                                        {value.heading && (
                                            <h3 className="text-2xl md:text-3xl font-heading uppercase">{value.heading}</h3>
                                        )}
                                        {value.description && (
                                            <p className="text-lg opacity-85">{value.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

