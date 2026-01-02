"use client";

import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import SanityImage from "@/components/atoms/SanityImage";
import LinksWrapper from "@/components/molecules/LinksWrapper";

interface OurJourneyProps {
    ourJourney?: {
        heading?: string;
        content?: any;
        links?: any;
        image?: {
            asset?: any;
            altText?: string;
        };
    };
}

export default function OurJourney({ ourJourney }: OurJourneyProps) {
    if (!ourJourney) return null;

    return (
        <section className="py-12 lg:py-36" id="our-journey">
            <div className="container">
                <div className="bg-white text-black grid grid-cols-1 md:grid-cols-2">
                    <div className="px-6 md:px-20 py-10 md:py-16 flex flex-col gap-y-12 md:gap-y-20">
                        {ourJourney.heading && (
                            <h2 className="font-heading text-80px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: ourJourney?.heading }} />
                        )}
                        <div className="">
                            {ourJourney.content && (
                                <CaseStudyRichText content={ourJourney.content} />
                            )}
                            {ourJourney?.links && ourJourney?.links?.length > 0 && (
                                <LinksWrapper links={ourJourney?.links} />
                            )}
                        </div>
                    </div>
                    {ourJourney.image && (
                        <div className="">
                            <SanityImage
                                image={ourJourney.image}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

