"use client";

import Link from "next/link";

interface ButtonProps {
    href: string;
    label: string;
    size?: "sm" | "default" | "lg";
    style?: "primary" | "outline";
    className?: string;
}

const Button = ({ 
    href, 
    label, 
    size = "default", 
    style = "primary",
    className = ""
}: ButtonProps) => {
    // Check if href is a hash link (starts with #)
    const isHashLink = href?.startsWith('#');

    // Handle hash link click with smooth scrolling
    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isHashLink) {
            e.preventDefault();
            const targetId = href.substring(1); // Remove the # symbol
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

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

    // Use anchor tag for hash links, Link component for regular links
    if (isHashLink) {
        return (
            <a
                href={href}
                onClick={handleHashClick}
                className={`${buttonBaseStyles} ${buttonSizeStyles[size]} ${buttonStyleStyles[style]} ${className}`}
            >
                {label}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={`${buttonBaseStyles} ${buttonSizeStyles[size]} ${buttonStyleStyles[style]} ${className}`}
        >
            {label}
        </Link>
    );
};

export default Button;


