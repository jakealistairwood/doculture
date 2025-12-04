"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface Heading {
    id: string;
    text: string;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const headingElements = headings.map((h) => 
                document.getElementById(h.id)
            ).filter(Boolean) as HTMLElement[];

            if (headingElements.length === 0) return;

            // Find the heading that's currently in view
            let current = "";
            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100) {
                    current = element.id;
                    break;
                }
            }

            setActiveId(current || headings[0]?.id || "");
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [headings]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for fixed header if any
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="flex flex-col gap-y-6">
            <h3 className="text-2xl font-medium tracking-wide mb-4">
                Table of Contents
            </h3>
            <ul className="flex flex-col gap-y-4">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <button
                            onClick={() => handleClick(heading.id)}
                            className={`flex items-center gap-x-3 text-left text-lg font-medium transition-colors hover:text-current cursor-pointer ${
                                activeId === heading.id
                                    ? "text-current"
                                    : "opacity-60"
                            }`}
                        >
                            <AnimatePresence>
                                {activeId === heading.id && (
                                    <motion.div 
                                        initial={{
                                            scale: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            scale: (activeId === heading.id) ? 1 : 0,
                                            opacity: (activeId === heading.id) ? 1 : 0
                                        }}
                                        className="h-[6px] w-[6px] bg-accent-orange"
                                    />
                                )}
                            </AnimatePresence>
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

