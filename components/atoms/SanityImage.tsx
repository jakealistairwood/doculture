import { urlForImage } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";

interface SanityImageProps {
    className?: string;
    image: any;
    priority?: boolean;
    style?: React.CSSProperties;
    alt?: string;
}

const SanityImage = (props: SanityImageProps) => {
    const { image: source, priority, className, style, alt } = props || {};
    // Handle both referenced and dereferenced assets
    const hasAsset = source?.asset?._ref || source?.asset?._id;
    // Use provided alt prop, or fallback to source.alt or source.altText
    const altText = alt || stegaClean(source?.alt) || stegaClean(source?.altText) || "";
    const image = hasAsset ? (
        <Image 
            style={style}
            className={className}
            width={getImageDimensions(source).width}
            height={getImageDimensions(source).height}
            alt={altText}
            src={urlForImage(source)?.url() as string}
            preload={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 200vw"
        />
    ) : null;

    return image;
}

export default SanityImage;

