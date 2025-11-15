import { urlForImage } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";

interface SanityImageProps {
    className?: string;
    image: any;
    priority?: boolean;
    style?: React.CSSProperties;
}

const SanityImage = (props: SanityImageProps) => {
    const { image: source, priority, className, style } = props || {};
    const image = source?.asset?._ref ? (
        <Image 
            style={style}
            className={className}
            width={getImageDimensions(source).width}
            height={getImageDimensions(source).height}
            alt={stegaClean(source?.alt) || ""}
            src={urlForImage(source)?.url() as string}
            preload={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 200vw"
        />
    ) : null;

    return image;
}

export default SanityImage;