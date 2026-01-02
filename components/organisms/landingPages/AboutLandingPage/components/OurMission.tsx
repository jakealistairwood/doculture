"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import SanityImage from "@/components/atoms/SanityImage";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });

    if (!ourMission) return null;

    const imageAnimationVariant = {
        initial: {
            y: 40,
            opacity: 0,
            scale: 0.95
        },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1
        }
    };

    return (
        <section className="bg-off-black text-white py-12 md:py-40">
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
                    {ourMission?.images && ourMission?.images.length > 0 && (
                        <div 
                            ref={containerRef}
                            className="grid grid-cols-1 md:grid-cols-3 gap-5"
                        >
                            {ourMission?.images?.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="relative aspect-[365/547] overflow-hidden"
                                    variants={imageAnimationVariant}
                                    initial="initial"
                                    animate={isInView ? "animate" : "initial"}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                >
                                    <SanityImage image={image} className="w-full h-full object-cover" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

