"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import SanityImage from "@/components/atoms/SanityImage";

interface OurValuesProps {
    ourValues?: {
        heading?: string;
        values?: Array<{
            icon?: {
                asset?: any;
                altText?: string;
            };
            heading?: string;
            description?: string;
        }>;
    };
}

export default function OurValues({ ourValues }: OurValuesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });

    if (!ourValues) return null;

    const containerVariant = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const valueCardVariant = {
        initial: {
            opacity: 0,
            y: 40
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                staggerChildren: 0.15
            }
        }
    };

    const iconVariant = {
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const textVariant = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <section className="py-12 lg:py-36">
            <div className="container">
                <div className="flex flex-col gap-y-12 md:gap-y-20">
                    {ourValues.heading && (
                        <h2 className="font-heading text-80px uppercase leading-[0.94] text-center" dangerouslySetInnerHTML={{ __html: ourValues?.heading }} />
                    )}
                    {ourValues.values && ourValues.values.length > 0 && (
                        <motion.div 
                            ref={containerRef}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                            variants={containerVariant}
                            initial="initial"
                            animate={isInView ? "animate" : "initial"}
                        >
                            {ourValues.values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col gap-y-16 gap-y-4 p-8 border border-white/10"
                                    variants={valueCardVariant}
                                >
                                    {value.icon && (
                                        <motion.div
                                            className="w-16 relative aspect-square flex items-center justify-center bg-[#242020] rounded-lg flex-none"
                                            variants={iconVariant}
                                        >
                                            <div className="flex items-center justify-center flex-none relative w-1/3">
                                                <SanityImage
                                                    image={value.icon}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                    <motion.div
                                        className="flex flex-col gap-y-4 mt-auto"
                                        variants={textVariant}
                                    >
                                        {value.heading && (
                                            <h3 className="text-2xl md:text-3xl font-heading uppercase">{value.heading}</h3>
                                        )}
                                        {value.description && (
                                            <p className="text-lg opacity-85">{value.description}</p>
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

