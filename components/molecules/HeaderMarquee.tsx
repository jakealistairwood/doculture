"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import getHexColor from "@/utils/getHexColor";

interface HeaderMarqueeProps {
    data?: {
        items?: string[];
    };
    bgColor?: string;
}

const HeaderMarquee = ({ data, bgColor }: HeaderMarqueeProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { amount: 0.2, once: false });

    const items = data?.items || [];

    if (!items.length) {
        return null;
    }

    const gradientColor = getHexColor(bgColor);

    // Create the marquee content with dashes between each heading
    // Format: "Item1 — Item2 — Item3 — Item4 —" (dash after each item for seamless looping)
    const marqueeItems = items.flatMap((item, index) => [
        <span key={`item-${index}`} className="whitespace-nowrap text-120px uppercase font-black font-heading">{item}</span>,
        <span key={`dash-${index}`} className="mx-8 inline-flex items-center" aria-hidden="true">
            <span className="inline-block w-[100px] border-t-[3px] border-current"></span>
        </span>
    ]);

    return (
        <div
            data-component="header-marquee"
            ref={containerRef}
            className="py-8"
        >
            <Marquee
                play={isInView}
                gradient
                gradientColor={gradientColor}
                speed={50}
            >
                {marqueeItems}
            </Marquee>
        </div>
    );
};

export default HeaderMarquee;
