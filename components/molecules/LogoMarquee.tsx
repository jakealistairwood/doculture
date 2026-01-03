"use client";

import { useInView } from "motion/react";
import { useMemo, useRef } from "react";
import Marquee from "react-fast-marquee";
import SanityImage from "@/components/atoms/SanityImage";
import { Logos, LogoMarquee as LogoMarqueeType, ReusableBlock } from "@/sanity/types";
import getHexColor from "@/utils/getHexColor";

interface LogoMarqueeProps {
    data?: Logos;
    speed?: number;
    bgColor?: string;
    disableInvertedLogoBg?: boolean;
    isOnContactPage?: boolean;
    invertLogos?: boolean;
}

type DereferencedLogos = Omit<Logos, 'logoMarqueeBlock'> & {
    logoMarqueeBlock?: ReusableBlock;
};

type LogoItem =
    NonNullable<LogoMarqueeType["logos"]> extends Array<infer Item>
        ? Item
        : never;

const LogoMarquee = ({ data, speed = 50, bgColor, disableInvertedLogoBg = false, isOnContactPage = false, invertLogos = false }: LogoMarqueeProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { amount: 0.2, once: false });
    
    const disableLogoInvert = disableInvertedLogoBg || !invertLogos;

    // Cast to handle dereferenced structure from query
    const dereferencedData = data as DereferencedLogos | undefined;
    const logoMarquee = dereferencedData?.logoMarqueeBlock?.logoMarquee;

    const baseLogos = useMemo<LogoItem[]>(() => {
        const resolved = logoMarquee?.logos ?? [];
        return Array.isArray(resolved) ? (resolved as LogoItem[]) : [];
    }, [logoMarquee?.logos]);

    // Duplicate logos twice (3x total) for marquee to ensure they always fill the space
    const marqueeLogos = useMemo<LogoItem[]>(() => {
        return [...baseLogos, ...baseLogos, ...baseLogos];
    }, [baseLogos]);

    if (!baseLogos.length) {
        return null;
    }

    const renderLogo = (logo: LogoItem, wrapperClass = "inline-flex", index?: number) => {
        const image = (
            <SanityImage
                image={logo}
                className="h-8 sm:h-14 md:max-h-[30px] w-auto object-contain"
            />
        );

        // Create unique key by combining original _key with index to avoid duplicate key warnings
        const uniqueKey = index !== undefined ? `${logo._key}-dup-${index}` : logo._key;

        if (logo.link) {
            return (
                <a
                    key={uniqueKey}
                    href={logo.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${wrapperClass} items-center ${disableLogoInvert ? "" : "invert"}`}
                    aria-label={logo.alt || "External link"}
                >
                    {image}
                </a>
            );
        }

        return (
            <div key={uniqueKey} className={`${wrapperClass} items-center`}>
                {image}
            </div>
        );
    };

    const gradientColor = getHexColor(bgColor) || undefined;

    const marqueeContent = (
        <Marquee
            play={isInView}
            gradient
            gradientColor={gradientColor}
            speed={speed}
        >
            {marqueeLogos.map((logo, index) => renderLogo(logo, `marquee-logo ${isOnContactPage ? "marquee-logo--contact mx-8 md:mx-10" : "mx-12"} flex ${disableLogoInvert ? "" : "invert"}`, index))}
        </Marquee>
    );

    const labelContent = data?.label ? (
        <p className={`text-xl ${data?.labelPlacement === "stacked" ? "text-center font-mono opacity-60 !text-base uppercase" : "font-serif"} whitespace-nowrap`}>
            {data.label}
        </p>
    ) : null;

    if (data?.type === "grid") {
        return (
            <div
                data-component="logos-grid"
                ref={containerRef}
                className="space-y-6 py-8"
            >
                {labelContent}
                <div className="flex flex-col lg:flex-row text-center lg:text-left items-center justify-center gap-8 py-8 lg:py-0">
                    {baseLogos.map((logo) =>
                        renderLogo(
                            logo,
                            "inline-flex max-w-[160px] justify-center"
                        )
                    )}
                </div>
            </div>
        );
    }

    if (data?.label && data?.labelPlacement === "side") {
        return (
            <div
                data-component="logo-marquee"
                ref={containerRef}
                className="flex flex-col lg:flex-row text-center lg:text-left gap-y-6 gap-x-20 py-4 lg:items-center lg:justify-between min-h-[51px]"
            >
                {labelContent}
                <div className="flex-1 max-w-[1000px] w-full">{marqueeContent}</div>
            </div>
        );
    }

    return (
        <div
            data-component="logo-marquee"
            ref={containerRef}
            className="space-y-8 py-8"
        >
            <div className="container text-center">
                <span className="font-sans">{labelContent}</span>
            </div>
            {marqueeContent}
        </div>
    );
};

export default LogoMarquee;