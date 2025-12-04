"use client";

import SanityImage from "@/components/atoms/SanityImage";

interface CaseStudyImageProps {
    image: {
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
}

export default function CaseStudyImage({ image }: CaseStudyImageProps) {
    // Handle both referenced and dereferenced assets
    if (!image?.asset?._ref && !image?.asset?._id) {
        return null;
    }

    return (
        <div className="">
            <SanityImage
                image={image}
                className="w-full h-auto rounded-lg"
            />
        </div>
    );
}

