"use client";

import { useRef } from "react";
import SanityImage from "@/components/atoms/SanityImage";
import { useInView, motion } from "framer-motion";

interface CaseStudyImageGridProps {
    columns?: "2" | "3" | "4";
    aspectRatio: "16/9" | "4/5" | "1/1" | "9/16";
    images?: Array<{
        _key?: string;
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
    }>;
}

export default function CaseStudyImageGrid({ columns = "2", aspectRatio = "4/5", images = [] }: CaseStudyImageGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });

    if (!images || images.length === 0) {
        return null;
    }

    const gridColsMap = {
        "2": "grid-cols-1 sm:grid-cols-2",
        "3": "grid-cols-1 sm:grid-cols-3",
        "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    const aspectRatioMap = {
        "4/5": "aspect-[4/5]",
        "16/9": "aspect-[16/9]",
        "9/16": "aspect-[9/16]",
        "1/1": "aspect-square"
    };

    const aspectRatioClass = aspectRatioMap[aspectRatio] || aspectRatioMap["4/5"];

    const gridCols = gridColsMap[columns] || gridColsMap["2"];

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
        <div 
            className={`grid ${gridCols} gap-5 my-8 md:my-12`}
            ref={containerRef}
        >
            {images.map((imageItem, index) => {
                if (!imageItem?.asset?._ref && !imageItem?.asset?._id) {
                    return null;
                }

                return (
                    <motion.div
                        key={imageItem._key || index}
                        className={`relative overflow-hidden ${aspectRatioClass}`}
                        variants={imageAnimationVariant}
                        initial="initial"
                        animate={isInView ? "animate" : "initial"}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        <SanityImage
                            image={imageItem}
                            className="w-full h-full object-cover"
                            alt={imageItem.altText || ""}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}

