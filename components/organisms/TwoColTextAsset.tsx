"use client";

import { useRef } from "react";
import { TwoColTextAsset as TwoColTextAssetType } from "@/sanity/types";
import TextCard from "@/components/organisms/TextCard";
import Asset from "@/components/molecules/Asset";
import { useInView, motion } from "framer-motion";
import clsx from "clsx";

const bgColorMap = {
    none: 'bg-transparent',
    black: 'bg-black',
    white: 'bg-white',
    lightGrey: 'bg-light-grey',
    darkGrey: 'bg-dark-grey',
    offBlack: 'bg-off-black'
} as const;

interface TwoColTextAssetProps {
    data: TwoColTextAssetType;
    bgColor?: string;
    isContainedSection: boolean;
    containedBgColor: string;
}

const TwoColTextAsset = ({ 
    data, 
    bgColor = 'none', 
    isContainedSection, 
    containedBgColor 
}: TwoColTextAssetProps) => {
    const { textCard, asset, alignTextVertically = false, reverseDirection = false } = data || {};
    const assetRef = useRef<HTMLDivElement>(null);

    const isInView = useInView(assetRef, {
        amount: 0.3,
        once: true
    });

    if (!textCard && !asset) {
        return null;
    }

    const maskBgColor = bgColorMap[bgColor as keyof typeof bgColorMap] || 'bg-transparent';

    const textColumn = textCard && (
        <div className={clsx(
            "flex",
            alignTextVertically && "items-center"
        )}>
            <TextCard 
                data={textCard} 
                bgColor={bgColor}
                isContainedSection={isContainedSection}
                containedBgColor={containedBgColor}
            />
        </div>
    );

    const assetColumn = asset && (
        <div className="w-full relative overflow-hidden" ref={assetRef}>
            <Asset data={asset} bgColor={bgColor} />
            <motion.div
                className={`absolute inset-0 z-[2] ${maskBgColor} origin-bottom`}
                initial={{
                    scaleY: 1
                }}
                animate={{
                    scaleY: isInView ? 0 : 1
                }}
                transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.1
                }}
                style={{
                    transformOrigin: 'bottom center'
                }}
            />
        </div>
    );

    return (
        <div 
            data-component="two-col-text-asset"
            className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16",
                alignTextVertically && "items-center",
                reverseDirection && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
            )}
        >
            {textColumn}
            {assetColumn}
        </div>
    );
};

export default TwoColTextAsset;

