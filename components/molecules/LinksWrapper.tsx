"use client";

import Link from "next/link";
import { LinksWrapper as LinksWrapperType } from "@/sanity/types";
import Button from "@/components/atoms/Button";

interface LinksWrapperProps {
    links: LinksWrapperType;
}

const LinksWrapper = ({ links = [] }: LinksWrapperProps) => {
    if (!links || links.length === 0) {
        return null;
    }

    const isHashLink = (url: string) => url?.startsWith('#');

    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex items-center flex-wrap gap-x-8 gap-y-4">
            {links.map((link) => {
                if (!link.url || !link.label) {
                    return null;
                }

                const url = link.url;
                const isButton = link.type === "button";
                const buttonSize = link.buttonSize || "default";
                const buttonStyle = link.buttonStyle || "primary";

                const textLinkStyles = "link-group text-white hover:text-white/80 transition-colors";

                if (isButton) {
                    return (
                        <Button
                            key={link._key}
                            href={url}
                            label={link.label}
                            size={buttonSize}
                            style={buttonStyle}
                        />
                    );
                }

                if (isHashLink(url)) {
                    return (
                        <a
                            key={link._key}
                            href={url}
                            onClick={(e) => handleHashClick(e, url)}
                            className={textLinkStyles}
                        >
                            {link.label}
                        </a>
                    );
                }

                return (
                    <Link
                        key={link._key}
                        href={url}
                        className={textLinkStyles}
                    >
                        <span data-underline-link="alt">{link.label}</span>
                    </Link>
                );
            })}
        </div>
    )
}

export default LinksWrapper;