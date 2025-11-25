"use client";

import { useInView } from "motion/react";
import { useMemo, useRef } from "react";
import Marquee from "react-fast-marquee";
import SanityImage from "@/components/atoms/SanityImage";
import { Logos, LogoMarquee as LogoMarqueeType } from "@/sanity/types";
import getHexColor from "@/utils/getHexColor";

interface LogoMarqueeProps {
    data?: Logos;
    speed?: number;
    bgColor?: string;
}

type LogoItem =
    NonNullable<LogoMarqueeType["logos"]> extends Array<infer Item>
        ? Item
        : never;

const LogoMarquee = ({ data, speed, bgColor }: LogoMarqueeProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { amount: 0.2, once: false });

    const logoMarquee = data?.logoMarqueeBlock?.logoMarquee;

    const logos = useMemo<LogoItem[]>(() => {
        const resolved = logoMarquee?.logos ?? [];
        return Array.isArray(resolved) ? (resolved as LogoItem[]) : [];
    }, [logoMarquee?.logos]);

    if (!logos.length) {
        return null;
    }

    const renderLogo = (logo: LogoItem, wrapperClass = "inline-flex") => {
        const image = (
            <SanityImage
                image={logo}
                className="max-h-16 w-auto object-contain"
            />
        );

        if (logo.link) {
            return (
                <a
                    key={logo._key}
                    href={logo.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${wrapperClass} items-center`}
                    aria-label={logo.alt || "External link"}
                >
                    {image}
                </a>
            );
        }

        return (
            <div key={logo._key} className={`${wrapperClass} items-center`}>
                {image}
            </div>
        );
    };

    const gradientColor = getHexColor(bgColor);

    const marqueeContent = (
        <Marquee
            play={isInView}
            gradient
            gradientColor={gradientColor}
            speed={50}
        >
            {logos.map((logo) => renderLogo(logo, "mx-12 flex invert"))}
        </Marquee>
    );

    const labelContent = data?.label ? (
        <p className="text-xl font-serif">
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
                <div className="flex flex-wrap items-center justify-center gap-8">
                    {logos.map((logo) =>
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
                className="flex flex-col gap-y-6 gap-x-20 py-8 md:flex-row md:items-center md:justify-between pt-4 min-h-[51px]"
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
            className="space-y-6 py-8"
        >
            {labelContent}
            {marqueeContent}
        </div>
    );
};

export default LogoMarquee;