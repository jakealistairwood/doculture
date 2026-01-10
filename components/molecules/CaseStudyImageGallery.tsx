"use client";

import { useRef } from "react";
import SanityImage from "@/components/atoms/SanityImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CaseStudyImageGalleryProps {
    images?: Array<{
        _key?: string;
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [key: string]: any;
        };
        media?: unknown;
        hotspot?: any;
        crop?: any;
        altText?: string;
        _type: "image";
    }>;
}

export default function CaseStudyImageGallery({ images = [] }: CaseStudyImageGalleryProps) {
    const swiperRef = useRef<SwiperType | null>(null);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full my-8 md:my-12">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={images.length > 1}
                navigation={{
                    prevEl: ".swiper-button-prev-case-study-gallery",
                    nextEl: ".swiper-button-next-case-study-gallery",
                }}
                pagination={{
                    clickable: true,
                    el: ".swiper-pagination-case-study-gallery",
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className="case-study-gallery-swiper"
            >
                {images.map((imageItem, index) => {
                    if (!imageItem?.asset?._ref && !imageItem?.asset?._id) {
                        return null;
                    }

                    return (
                        <SwiperSlide key={imageItem._key || index}>
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                                <SanityImage
                                    image={imageItem}
                                    className="w-full h-full object-cover"
                                    alt={imageItem?.altText || ""}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Custom Navigation Controls */}
            {images.length > 1 && (
                <>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            className="swiper-button-prev-case-study-gallery p-2 bg-white/10 text-white hover:bg-accent-orange hover:text-off-black transition-colors rounded-full"
                            aria-label="Previous image"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div className="swiper-pagination-case-study-gallery flex items-center justify-center gap-2" />
                        <button
                            className="swiper-button-next-case-study-gallery p-2 bg-white/10 text-white hover:bg-accent-orange hover:text-off-black transition-colors rounded-full"
                            aria-label="Next image"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            <style jsx global>{`
                .case-study-gallery-swiper {
                    overflow: visible;
                }
                .swiper-pagination-case-study-gallery {
                    position: static !important;
                    width: auto !important;
                }
                .swiper-pagination-case-study-gallery .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.3);
                    opacity: 1;
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                }
                .swiper-pagination-case-study-gallery .swiper-pagination-bullet-active {
                    background: white;
                }
            `}</style>
        </div>
    );
}

