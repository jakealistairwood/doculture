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
    if (!image?.asset?._ref) {
        return null;
    }

    return (
        <div className="my-8 md:my-12">
            <SanityImage
                image={image}
                className="w-full h-auto rounded-lg"
            />
        </div>
    );
}

