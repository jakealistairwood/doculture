"use client";

import { useState, useRef } from "react";
import SanityImage from "../atoms/SanityImage";
import { Studio } from "@/sanity/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


interface StudioCarouselProps {
    data: {
        studios?: Studio[];
    };
}

const StudioCarousel = ({ data }: StudioCarouselProps) => {
    const { studios = [] } = data || {};
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    if (!studios || studios.length === 0) {
        return null;
    }

    const handlePrevious = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handleDotClick = (index: number) => {
        swiperRef.current?.slideTo(index);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1.001}
                // centeredSlides={true}
                loop
                // loopAdditionalSlides={2}
                navigation={{
                    prevEl: ".swiper-button-prev-custom",
                    nextEl: ".swiper-button-next-custom",
                }}
                pagination={false}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveIndex(swiper.realIndex);
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                className="studio-carousel"
                style={{
                    paddingBottom: "3rem",
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1.3,
                        spaceBetween: 40,
                        // loopAdditionalSlides: 2,
                    },
                    1024: {
                        slidesPerView: 1.15,
                        spaceBetween: 50,
                        // loopAdditionalSlides: 2,
                    },
                }}
            >
                {studios.map((studio, index) => (
                    <SwiperSlide key={studio._id || index} className="w-full h-full">
                        <div className="flex flex-col aspect-video w-full mx-auto relative rounded-lg overflow-hidden">
                            {studio.coverImage && (
                                <div className="w-full h-full absolute inset-0">
                                    <SanityImage
                                        image={studio.coverImage}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col relative z-[2] p-10 mt-auto">
                                <div className="absolute h-full w-full inset-0" style={{
                                    background: "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
                                }} />
                                {studio.title && (
                                    <h2 className="studio-slide-text text-4xl md:text-5xl font-heading uppercase mb-4 relative z-[3]">
                                        {studio.title}
                                    </h2>
                                )}
                                {studio.description && (
                                    <p className="studio-slide-text text-lg md:text-xl mb-6 max-w-2xl relative z-[3]">
                                        {studio.description}
                                    </p>
                                )}
                                {studio.features && studio.features.length > 0 && (
                                    <ul className="studio-slide-text flex flex-wrap gap-4 relative z-[3]">
                                        {studio.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="px-4 py-2 border border-current rounded-md text-sm uppercase"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            {studios.length > 1 && (
                <>
                    <button
                        onClick={handlePrevious}
                        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Previous studio"
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
                    <button
                        onClick={handleNext}
                        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Next studio"
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
                </>
            )}

            {/* Custom Pagination Dots */}
            {studios.length > 1 && (
                <div className="flex justify-center gap-2 mt-8 z-20 relative">
                    {studios.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? 'bg-current w-8 h-2 opacity-100'
                                    : 'bg-current w-2 h-2 opacity-30'
                            }`}
                            aria-label={`Go to studio ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <style jsx global>{`
                .studio-carousel {
                    overflow: visible;
                }
                
                .studio-carousel .swiper-wrapper {
                    align-items: center;
                }
                
                .studio-carousel .swiper-slide {
                    opacity: 0.3;
                    transition: opacity 0.5s ease-in-out;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .studio-carousel .swiper-slide-active {
                    opacity: 1;
                }
                
                /* Hide text elements by default */
                .studio-carousel .studio-slide-text {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.4s ease-out, transform 0.6s ease-out;
                }
                
                /* Show text elements when slide is active */
                .studio-carousel .swiper-slide-active .studio-slide-text {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Stagger animation for multiple text elements */
                .studio-carousel .swiper-slide-active .studio-slide-text:nth-child(1) {
                    transition-delay: 0.1s;
                }
                
                .studio-carousel .swiper-slide-active .studio-slide-text:nth-child(2) {
                    transition-delay: 0.2s;
                }
                
                .studio-carousel .swiper-slide-active .studio-slide-text:nth-child(3) {
                    transition-delay: 0.3s;
                }
            `}</style>
        </div>
    );
};

export default StudioCarousel;

