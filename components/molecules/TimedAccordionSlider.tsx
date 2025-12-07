"use client";

import { useState, useEffect, useRef } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";
import SanityImage from "@/components/atoms/SanityImage";
import { BlockContent } from "@/sanity/types";

// Extract types from BlockContent
type BlockContentImage = Extract<BlockContent[number], { _type: "image" }>;

interface AccordionItem {
    _key?: string;
    heading?: string;
    content?: BlockContent;
    image?: {
        asset?: {
            _ref?: string;
            _id?: string;
        };
        altText?: string;
    };
}

interface TimedAccordionSliderProps {
    data: {
        items?: AccordionItem[];
    };
    bgColor?: string;
}

const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds

export default function TimedAccordionSlider({ data, bgColor }: TimedAccordionSliderProps) {
    const { items = [] } = data;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-advance functionality
    useEffect(() => {
        if (items.length === 0 || isPaused) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, AUTO_ADVANCE_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [items.length, isPaused]);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        setIsPaused(true);
        
        // Resume auto-advance after a delay
        setTimeout(() => {
            setIsPaused(false);
        }, AUTO_ADVANCE_INTERVAL * 2);
    };

    const activeItem = items[activeIndex];
    const activeImage = activeItem?.image;

    if (items.length === 0) {
        return null;
    }

    // PortableText components for rendering blockContent
    const portableTextComponents = {
        block: {
            normal: ({ children }: { children?: React.ReactNode }) => (
                <p className="mb-4 last:mb-0">{children}</p>
            ),
            h1: ({ children }: { children?: React.ReactNode }) => (
                <h1 className="text-3xl md:text-4xl font-heading uppercase mb-4">{children}</h1>
            ),
            h2: ({ children }: { children?: React.ReactNode }) => (
                <h2 className="text-2xl md:text-3xl font-heading uppercase mb-4">{children}</h2>
            ),
            h3: ({ children }: { children?: React.ReactNode }) => (
                <h3 className="text-xl md:text-2xl font-heading uppercase mb-4">{children}</h3>
            ),
            blockquote: ({ children }: { children?: React.ReactNode }) => (
                <blockquote className="border-l-4 border-current pl-4 italic my-4">{children}</blockquote>
            ),
        },
        marks: {
            strong: ({ children }: { children?: React.ReactNode }) => (
                <strong className="font-bold">{children}</strong>
            ),
            em: ({ children }: { children?: React.ReactNode }) => (
                <em className="italic">{children}</em>
            ),
        },
        types: {
            image: ({ value }: { value: BlockContentImage }) => {
                if (!value?.asset?._ref) return null;
                return (
                    <div className="my-4">
                        <SanityImage image={value} className="w-full h-auto rounded-lg" />
                    </div>
                );
            },
        },
    } as PortableTextComponents;

    return (
        <div className="w-full" data-component="timed-accordion-slider">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
                {/* Accordion Items - Left Side */}
                <div className="flex flex-col self-center">
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={item._key || index}
                                className="border-b border-white/[20%] overflow-hidden transition-all group"
                            >
                                <button
                                    type="button"
                                    onClick={() => handleItemClick(index)}
                                    className="w-full text-left py-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                                    aria-expanded={isActive}
                                    aria-controls={`accordion-content-${index}`}
                                >
                                    <h3 className={`text-xl md:text-3xl font-heading uppercase flex-1 group-hover:opacity-100 ${isActive ? "opacity-100" : "opacity-40"}`}>
                                        {item.heading || `Item ${index + 1}`}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        <motion.div
                                            animate={{ rotate: isActive ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-6 h-6 flex items-center justify-center"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 7.5L10 12.5L15 7.5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {isActive && item.content && (
                                        <motion.div
                                            id={`accordion-content-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6 pt-0">
                                                <div className="prose prose-invert max-w-[90%]">
                                                    <PortableText
                                                        value={item.content}
                                                        components={portableTextComponents}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Image - Right Side */}
                <div className="relative aspect-[685/780] lg:sticky lg:top-20">
                    <AnimatePresence mode="wait">
                        {activeImage && (
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <SanityImage
                                    image={activeImage}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Fallback if no image */}
                    {!activeImage && (
                        <div className="absolute inset-0 w-full h-full bg-white/10 flex items-center justify-center">
                            <p className="text-white/60">No image available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

