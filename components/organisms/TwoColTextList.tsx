"use client";

import { useRef } from "react";
import { TwoColTextList as TwoColTextListType } from "@/sanity/types";
import TextCard from "@/components/organisms/TextCard";
import { useInView, motion } from "framer-motion";
import clsx from "clsx";

const bgColorMap = {
    none: "bg-transparent",
    black: "bg-black text-white",
    white: "bg-white",
    lightGrey: "bg-light-grey text-black",
    darkGrey: "bg-dark-grey text-white",
    offBlack: "bg-off-black text-white",
} as const;

interface TwoColTextListProps {
    data: TwoColTextListType;
    bgColor?: string;
    isContainedSection: boolean;
    containedBgColor: string;
}

const TwoColTextList = ({
    data,
    bgColor = "none",
    isContainedSection,
    containedBgColor,
}: TwoColTextListProps) => {
    const {
        textCard,
        listItems = [],
        alignTextVertically = false,
        bgColor: componentBgColor,
    } = data || {};
    const listRef = useRef<HTMLDivElement>(null);

    const isInView = useInView(listRef, {
        amount: 0.3,
        once: true,
    });

    if (!textCard && (!listItems || listItems.length === 0)) {
        return null;
    }

    const effectiveBgColor = componentBgColor || bgColor;

    const sectionBg = bgColorMap[effectiveBgColor] || "bg-off-black text-white";

    console.log(sectionBg);

    return (
        <div
            data-component="two-col-text-list"
            className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-16 px-12 py-16 md:p-20",
                alignTextVertically && "items-center",
                sectionBg
            )}
        >
            {textCard && (
                <div
                    className={clsx(
                        "flex items-center",
                        "lg:max-w-[300px]"
                    )}
                >
                    <TextCard
                        data={textCard}
                        bgColor={effectiveBgColor}
                        isContainedSection={isContainedSection}
                        containedBgColor={containedBgColor}
                    />
                </div>
            )}
            {listItems && (
                <ul className="flex flex-col gap-y-2 list-disc pl-10 lg:pl-0">
                    {listItems?.map((item, i) => (
                        <li key={`list-item-${i}`} className="font-heading text-40px uppercase">{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TwoColTextList;
