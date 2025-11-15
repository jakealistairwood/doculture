import Link from "next/link";
import { LinksWrapper as LinksWrapperType } from "@/sanity/types";

interface LinksWrapperProps {
    links: LinksWrapperType;
}

const LinksWrapper = ({ links = [] }: LinksWrapperProps) => {
    if (!links || links.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center flex-wrap gap-4">
            {links.map((link) => {
                if (!link.url || !link.label) {
                    return null;
                }

                const isButton = link.type === "button";
                const buttonSize = link.buttonSize || "default";
                const buttonStyle = link.buttonStyle || "primary";

                // Button styles
                const buttonBaseStyles = "inline-flex items-center justify-center font-medium transition-colors rounded-[3px]";
                const buttonSizeStyles = {
                    sm: "px-4 py-2 text-sm",
                    default: "px-6 py-3 text-base",
                    lg: "px-8 py-4 text-lg",
                };
                const buttonStyleStyles = {
                    primary: "bg-white text-black hover:bg-white/90",
                    outline: "border-2 border-white text-white hover:bg-white hover:text-black",
                };

                // Text link styles
                const textLinkStyles = "text-white hover:text-white/80 underline underline-offset-4 transition-colors";

                if (isButton) {
                    return (
                        <Link
                            key={link._key}
                            href={link.url}
                            className={`${buttonBaseStyles} ${buttonSizeStyles[buttonSize]} ${buttonStyleStyles[buttonStyle]}`}
                        >
                            {link.label}
                        </Link>
                    );
                }

                return (
                    <Link
                        key={link._key}
                        href={link.url}
                        className={textLinkStyles}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    )
}

export default LinksWrapper;