"use client";

import { FullWidthAsset as FullWidthAssetType } from "@/sanity/types";
import SanityImage from "@/components/atoms/SanityImage";
import { urlForImage } from "@/sanity/lib/image";
import VideoPlayer from "@/components/atoms/VideoPlayer";

interface FullWidthAssetProps {
    data: FullWidthAssetType;
}

const FullWidthAsset = ({ data }: FullWidthAssetProps) => {
    if (!data) {
        return null;
    }

    const { type, image, video, videoPoster, videoOptions, id } = data;

    if (type === "image" && image) {
        return (
            <div className="w-full" id={id}>
                <SanityImage
                    image={image}
                    className="w-full h-auto object-cover"
                />
            </div>
        );
    }

    if (type === "video" && video) {
        return (
            <div className="w-full" id={id}>
                <VideoPlayer
                    video={video}
                    poster={videoPoster}
                    options={videoOptions}
                />
            </div>
        );
    }

    return null;
};

export default FullWidthAsset;
