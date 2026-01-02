"use client";

interface OurMissionProps {
    ourMission?: {
        subheading?: string;
        heading?: string;
        images?: Array<{
            asset?: any;
            altText?: string;
        }>;
    };
}

export default function OurMission({ ourMission }: OurMissionProps) {
    if (!ourMission) return null;

    return (
        <section className="bg-off-black text-white">
            <div className="container">
                <div className="flex flex-col gap-y-12 md:gap-y-20">
                    <div className="flex flex-col gap-y-6 max-w-[786px] mx-auto items-center text-center">
                        {ourMission?.subheading && (
                            <h2 className="!font-mono uppercase opacity-75" dangerouslySetInnerHTML={{ __html: ourMission?.subheading }} />
                        )}
                        {ourMission?.heading && (
                            <h3 className="text-2xl" dangerouslySetInnerHTML={{ __html: ourMission?.heading }} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

