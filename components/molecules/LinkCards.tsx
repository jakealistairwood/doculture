"use client";

import { LinkCards as LinkCardsType } from "@/sanity/types";
import Link from "next/link";
import SanityImage from "../atoms/SanityImage";

interface LinkCardsProps {
    data: LinkCardsType;
}

const layoutMap = {
    twoCols: "grid-cols-1 sm:grid-cols-2",
    threeCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    fourCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};

const LinkCards = ({ data }: LinkCardsProps) => {
    const { layout = "threeCols", links = [] } = data || {};

    const gridContainerClasses = layoutMap[layout] || "grid-cols-3";

    // Check if href is a hash link (starts with #)
    const isHashLink = (url: string) => url?.startsWith('#');

    // Handle hash link click with smooth scrolling
    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.substring(1); // Remove the # symbol
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (!links || links?.length === 0) {
        return null;
    }

    return (
        <div className={`grid ${gridContainerClasses} gap-5`}>
            {links?.map((link, i) => {
                if (!link?.url) return null;
                
                const url = link.url;
                const hashLink = isHashLink(url);

                return (
                    <div key={i} className="relative aspect-[460/538] flex flex-col group rounded-lg overflow-hidden p-10">
                        {link?.image && (
                            <SanityImage image={link?.image} className="absolute inset-0 h-full w-full object-cover grayscale" />
                        )}
                        <div className="absolute h-full w-full z-[1] inset-0" style={{
                            background: "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
                        }} />
                        <div className="flex flex-col gap-y-6 items-center text-center mt-auto">
                            {hashLink ? (
                                <a
                                    href={url}
                                    onClick={(e) => handleHashClick(e, url)}
                                    className="accessible-link"
                                >
                                    <h2 className="relative z-[2] font-heading uppercase text-3xl">{link?.title}</h2>
                                </a>
                            ) : (
                                <Link href={url} className="accessible-link">
                                    <h2 className="relative z-[2] font-heading uppercase text-3xl">{link?.title}</h2>
                                </Link>
                            )}
                            <div className="relative z-[2] border border-accent-orange text-accent-orange rounded-[3px] px-4 py-3 w-full group-hover:bg-accent-orange group-hover:text-black duration-200 ease transition-colors font-mono uppercase">
                                <span>Find out more</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LinkCards;
