"use client";

import { useRef } from "react";
import { Asset as AssetType } from "@/sanity/types";
import SanityImage from "@/components/atoms/SanityImage";
import VideoPlayer from "@/components/atoms/VideoPlayer";
import { motion, useInView } from "framer-motion";

interface AssetProps {
    data: AssetType;
    bgColor?: string;
}

const Asset = ({ data, bgColor }: AssetProps) => {
    if (!data) {
        return null;
    }

    const { type, image, video, videoPoster, videoOptions, id } = data;

    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: 0.2,
        once: true
    })

    if (type === "image" && image) {
        return (
            <div 
                className="w-full" 
                id={id}
            >
                <SanityImage
                    image={image}
                    className="w-full h-auto object-cover"
                />
            </div>
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

export default Asset;

