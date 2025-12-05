"use client";

import { useInView, motion } from "motion/react";
import { useRef } from "react";
import getHexColor from "@/utils/getHexColor";
import { FeatureCards as FeatureCardsType } from "@/sanity/types";
import FrameCorner from "../atoms/FrameCorner";

interface FeatureCardsProps {
    data?: FeatureCardsType;
    bgColor?: string;
}

const layoutMap = {
    twoCols: "grid-cols-1 sm:grid-cols-2",
    threeCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    fourCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};

const FeatureCards = ({ data, bgColor }: FeatureCardsProps) => {
    const { layout = "threeCols", features = [] } = data || {};

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });

    const gridContainerClasses = layoutMap[layout] || "grid-cols-3";

    if (!features || features.length === 0) {
        return null;
    }

    const cardAnimationVariant = {
        initial: {
            y: 50,
            opacity: 0,
            filter: "blur(12px)"
        },
        animate: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)"
        }
    }

    const textAnimationVariant = {
        initial: {
            y: 20,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className={`grid ${gridContainerClasses} gap-5`} ref={containerRef}>
            {features?.map((feature, i) => (
                <motion.div 
                    key={`feature-card-${feature?._key}`} 
                    className="flex flex-col gap-y-16 bg-white text-black px-10 py-14 relative"
                    variants={cardAnimationVariant}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                >
                    <FrameCorner className="absolute top-0 left-0 text-accent-orange aspect-square w-[40px]" />
                    <FrameCorner className="absolute top-0 right-0 rotate-90 text-accent-orange aspect-square w-[40px]" />
                    <FrameCorner className="absolute bottom-0 right-0 rotate-180 text-accent-orange aspect-square w-[40px]" />
                    <FrameCorner className="absolute bottom-0 left-0 rotate-270 text-accent-orange aspect-square w-[40px]" />
                    <div>
                        <div className="flex flex-col gap-y-5">
                            <motion.h3 
                                className="font-heading uppercase text-2xl"
                                variants={textAnimationVariant}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1 + 0.3,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                            >
                                {feature?.title}
                            </motion.h3>
                            <motion.p 
                                className="opacity-70 text-lg"
                                variants={textAnimationVariant}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1 + 0.4,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                            >
                                {feature?.description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
};

export default FeatureCards;
