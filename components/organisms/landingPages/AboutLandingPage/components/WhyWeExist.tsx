"use client";

import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";

interface WhyWeExistProps {
    whyWeExist?: {
        heading?: string;
        content?: any;
    };
}

export default function WhyWeExist({ whyWeExist }: WhyWeExistProps) {
    if (!whyWeExist) return null;

    return (
        <section className="pb-12 md:pb-40" id="why-we-exist">
            <div className="container">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    {whyWeExist.heading && (
                        <h2 className="w-fit font-heading text-80px uppercase leading-[0.94] mb-8" dangerouslySetInnerHTML={{ __html: whyWeExist?.heading }} />
                    )}
                    {whyWeExist.content && (
                        <div className="max-w-[70ch] w-full">
                            <CaseStudyRichText content={whyWeExist.content} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}


