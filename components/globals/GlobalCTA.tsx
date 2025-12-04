"use client";

import SanityImage from "@/components/atoms/SanityImage";
import Link from "next/link";

interface GlobalCTAProps {
    data: {
        image?: {
            asset?: {
                _ref: string;
                _type: "reference";
                _weak?: boolean;
                [key: string]: any;
            };
            media?: unknown;
            hotspot?: any;
            crop?: any;
            altText?: string;
            _type: "image";
        };
        heading?: string;
        description?: string;
        link?: {
            url?: string;
            title?: string;
        };
    };
}

export default function GlobalCTA({ data }: GlobalCTAProps) {
    if (!data) {
        return null;
    }

    const { image, heading, description, link } = data;

    return (
        <section className="bg-off-black text-white">
            {image && (
                <div className="flex flex-col">
                    <div className="relative aspect-[1420/678] max-w-[1420px] w-full mx-auto flex items-end justify-end">
                        <SanityImage
                            image={image}
                            className="absolute z-[1] inset-0 w-full h-full object-cover"
                        />
                        <div className="hidden bg-white text-off-black lg:flex relative z-[2] flex-col gap-y-8 p-10">
                            <div className="flex flex-col">
                                {heading && (
                                    <h2
                                        className="text-40px font-heading uppercase leading-[0.94]"
                                        dangerouslySetInnerHTML={{
                                            __html: heading,
                                        }}
                                    />
                                )}

                                {description && (
                                    <p className="text-lg md:text-xl opacity-80 max-w-2xl">
                                        {description}
                                    </p>
                                )}
                            </div>
                            {link?.url && link?.title && (
                                <div className="mt-4">
                                    <Link
                                        href={link.url}
                                        className="w-full min-h-[55px] bg-off-black text-white rounded-[3px] px-6 py-3 hover:bg-accent-orange hover:text-off-black transition-colors duration-200 font-mono uppercase flex items-center justify-between gap-x-3"
                                    >
                                        {link.title}
                                        <ArrowIcon />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white text-off-black flex relative z-[2] flex-col sm:flex-row sm:items-center sm:justify-between gap-y-8 p-10 lg:hidden">
                        <div className="flex flex-col">
                            {heading && (
                                <h2
                                    className="text-40px font-heading uppercase leading-[0.94]"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            )}

                            {description && (
                                <p className="text-lg md:text-xl opacity-80 max-w-2xl">
                                    {description}
                                </p>
                            )}
                        </div>
                        {link?.url && link?.title && (
                            <div className="mt-4">
                                <Link
                                    href={link.url}
                                    className="w-full min-h-[55px] bg-off-black text-white rounded-[3px] px-6 py-3 hover:bg-accent-orange hover:text-off-black transition-colors duration-200 font-mono uppercase flex items-center justify-between gap-x-3"
                                >
                                    {link.title}
                                    <ArrowIcon />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}



const ArrowIcon = () => {
    return (
        <svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.5781 15.7142L17.3676 9.92473L11.5781 4.13525"
                stroke="currentColor"
                strokeWidth="1.32331"
                strokeMiterlimit="10"
            />
            <path
                d="M17.3686 9.9248H1.6543"
                stroke="currentColor"
                stroke-width="1.32331"
                strokeMiterlimit="10"
            />
        </svg>
    )
}