"use client";

import { useRef } from "react";
import { FullWidthAsset as FullWidthAssetType } from "@/sanity/types";
import SanityImage from "@/components/atoms/SanityImage";
import VideoPlayer from "@/components/atoms/VideoPlayer";
import { useInView, motion } from "framer-motion";

interface FullWidthAssetProps {
    data: FullWidthAssetType;
}

const FullWidthAsset = ({ data }: FullWidthAssetProps) => {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        amount: 0.3,
        once: true
    });

    if (!data) {
        return null;
    }

    const { type, image, video, videoPoster, videoOptions, id } = data;

    if (type === "image" && image) {
        return (
            <motion.div 
                className="w-full" 
                id={id} 
                ref={ref}
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20
                }}
            >
                <SanityImage
                    image={image}
                    className="w-full h-auto object-cover"
                />
            </motion.div>
        );
    }

    if (type === "video" && video) {
        return (
            <motion.div 
                className="w-full" 
                id={id} 
                ref={ref}
                initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.9
                }}
                animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20,
                    scale: isInView ? 1 : 0.9,
                    transition: {
                        duration: 0.5
                    }
                }}
            >
                <VideoPlayer
                    video={video}
                    poster={videoPoster}
                    options={videoOptions}
                />
            </motion.div>
        );
    }

    return null;
};

export default FullWidthAsset;
