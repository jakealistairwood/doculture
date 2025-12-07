"use client";

import { useRef } from "react";
import { ImageGrid as ImageGridType } from "@/sanity/types";
import SanityImage from "@/components/atoms/SanityImage";
import { useInView, motion } from "framer-motion";

interface ImageGridProps {
    data?: ImageGridType;
    bgColor?: string;
}

const aspectRatioMap = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    wide: "aspect-video",
    auto: ""
} as const;

const ImageGrid = ({ data, bgColor }: ImageGridProps) => {
    const { images = [], aspectRatio = 'square' } = data || {};
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });

    if (!images || images.length === 0) {
        return null;
    }

    const aspectRatioClass = aspectRatioMap[aspectRatio as keyof typeof aspectRatioMap] || "aspect-square";

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
            data-component="image-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            ref={containerRef}
        >
            {images.map((imageItem, index) => {
                if (!imageItem?.asset?._ref && !imageItem?.asset?._id) {
                    return null;
                }

                return (
                    <motion.div
                        key={imageItem._key || index}
                        className={`relative overflow-hidden ${aspectRatio !== 'auto' ? aspectRatioClass : ''}`}
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
                            className={aspectRatio === 'auto' ? "w-full h-auto object-cover" : "w-full h-full object-cover"}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ImageGrid;

