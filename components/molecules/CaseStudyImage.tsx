"use client";

import SanityImage from "@/components/atoms/SanityImage";
import VideoPlayer from "@/components/atoms/VideoPlayer";

interface CaseStudyImageProps {
    type?: "image" | "video";
    image?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [key: string]: any;
        };
        media?: unknown;
        hotspot?: any;
        crop?: any;
        alt?: string;
        _type: "image";
    };
    video?: string;
    videoPoster?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [key: string]: any;
        };
        media?: unknown;
        hotspot?: any;
        crop?: any;
        alt?: string;
        _type: "image";
    };
    videoOptions?: {
        title?: string;
        type?: 'normal' | 'short';
    };
}

export default function CaseStudyImage({ type, image, video, videoPoster, videoOptions }: CaseStudyImageProps) {
    // If explicitly video type and video exists, show video
    if (type === "video" && video) {
        return (
            <div className="my-8 md:my-12">
                <VideoPlayer
                    video={video}
                    poster={videoPoster}
                    options={videoOptions}
                />
            </div>
        );
    }

    // Show image if it exists (this covers image type, undefined type, and legacy content)
    if (image) {
        const hasAsset = image?.asset?._ref || image?.asset?._id;
        
        if (hasAsset) {
            return (
                <div className="">
                    <SanityImage
                        image={image}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            );
        }
    }

    // Fallback: if video exists and no image, show video (handles edge cases)
    if (video) {
        return (
            <div className="">
                <VideoPlayer
                    video={video}
                    poster={videoPoster}
                    options={videoOptions}
                />
            </div>
        );
    }

    return null;
}

