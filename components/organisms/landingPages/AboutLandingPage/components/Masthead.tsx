"use client";

import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

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
    if (!masthead) return null;

    return (
        <section className="relative min-h-screen flex items-center justify-center">
            <div className="container">
                <div className="flex flex-col gap-y-12 items-center text-center relative">
                    <div className="flex flex-col gap-y-4 md:gap-y-8 items-center text-center max-w-[722px] w-full mx-auto relative z-[2]" style={{
                        maxWidth: `${masthead?.mastheadMaxWidth}px`
                    }}>
                        <div className="flex flex-col">
                            {masthead?.subheading && (
                                <h1 className="!font-mono uppercase">{masthead?.subheading}</h1>
                            )}
                        </div>
                        {masthead?.heading && (
                            <h1 className="text-80px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: masthead.heading }} />
                        )}
                        {masthead?.description && (
                            <p className="font-serif font-light text-2xl md:text-4xl">
                                {masthead.description}
                            </p>
                        )}
                        {masthead?.links && (
                            <LinksWrapper links={masthead.links} />
                        )}
                    </div>
                </div>
                <div className="absolute inset-0 h-full w-full">
                    <div className="container relative h-full">
                        {/* Four absolutely positioned images */}
                        {masthead?.leftTopImage && (
                            <div className="absolute top-30 left-0 aspect-[285/186] max-w-[286px] overflow-hidden">
                                <SanityImage
                                    image={masthead.leftTopImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                        {masthead?.leftBottomImage && (
                            <div className="absolute bottom-0 left-40 aspect-[219/290] max-w-[219px] overflow-hidden">
                                <SanityImage
                                    image={masthead.leftBottomImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                        {masthead?.rightTopImage && (
                            <div className="absolute top-30 right-0 aspect-[285/186] max-w-[285px] overflow-hidden">
                                <SanityImage
                                    image={masthead.rightTopImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                        {masthead?.rightBottomImage && (
                            <div className="absolute bottom-0 right-40 aspect-[233/309] max-w-[233px] overflow-hidden">
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

