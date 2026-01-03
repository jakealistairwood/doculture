"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import SanityImage from "../atoms/SanityImage";
import { Studio } from "@/sanity/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import NumberFlow from "@number-flow/react";

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
    const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
    const [mounted, setMounted] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!selectedStudio) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedStudio(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [selectedStudio]);

    if (!studios || studios.length === 0) {
        return null;
    }

    const handleStudioClick = (studio: Studio) => {
        if (studio.description) {
            setSelectedStudio(studio);
        }
    };

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
                    <SwiperSlide key={studio._id || index} className="w-full h-full flex flex-col !items-start">
                        <div 
                            className={`flex flex-col aspect-video w-full mx-auto relative rounded-lg overflow-hidden ${studio.description ? 'cursor-pointer' : ''}`}
                            onClick={() => handleStudioClick(studio)}
                        >
                            {studio.coverImage && (
                                <div className="w-full h-full absolute inset-0">
                                    <SanityImage
                                        image={studio.coverImage}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            {/* Desktop: Content overlays on image */}
                            <div className="hidden lg:flex flex-col relative z-[2] p-10 mt-auto">
                                <div className="absolute h-full w-full inset-0" style={{
                                    background: "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
                                }} />
                                {studio.title && (
                                    <h2 className="studio-slide-text text-4xl md:text-5xl font-heading uppercase mb-4 relative z-[3]">
                                        {studio.title}
                                    </h2>
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
                        {/* Mobile/Tablet: Content appears below image */}
                        <div className="flex flex-col relative pt-8 mt-auto lg:hidden">
                            {studio.title && (
                                <h2 className="studio-slide-text text-3xl xl:text-5xl font-heading uppercase mb-4 relative z-[3]">
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
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Controls - Below Carousel */}
            {studios.length > 1 && (
                <div className="flex items-center justify-between gap-4 mt-8 z-20 relative">
                    {/* Slide Indicator */}
                    <div className="text-4xl font-heading uppercase font-medium tabular-nums">
                        <span>0<NumberFlow value={activeIndex + 1} trend={0} format={{ notation: "compact" }} /></span>
                        <span>/</span>
                        <span>{String(studios.length).padStart(2, '0')}</span>
                        {/* {String(activeIndex + 1).padStart(2, '0')}/{String(studios.length).padStart(2, '0')} */}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevious}
                            className="swiper-button-prev-custom p-2 bg-white/10 text-white hover:bg-accent-orange hover:text-off-black transition-colors"
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
                            className="swiper-button-next-custom p-2 bg-white/10 text-white hover:bg-accent-orange hover:text-off-black transition-colors"
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
                    </div>
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

            {/* Studio Modal */}
            {mounted && selectedStudio && createPortal(
                <div
                    className="fixed inset-0 h-screen w-screen bg-black/80 flex items-center justify-center z-[9999] p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedStudio(null);
                        }
                    }}
                >
                    <div className="bg-white text-black rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedStudio(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-accent-orange hover:text-off-black transition-colors rounded-full"
                            aria-label="Close modal"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Cover Image */}
                        {selectedStudio.coverImage && (
                            <div className="w-full h-64 md:h-96 relative">
                                <SanityImage
                                    image={selectedStudio.coverImage}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            {selectedStudio.title && (
                                <h2 className="text-4xl md:text-5xl font-heading uppercase mb-6">
                                    {selectedStudio.title}
                                </h2>
                            )}
                            
                            {selectedStudio.description && (
                                <p className="text-lg md:text-xl mb-8 leading-relaxed whitespace-pre-line">
                                    {selectedStudio.description}
                                </p>
                            )}

                            {selectedStudio.features && selectedStudio.features.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-2xl font-heading uppercase mb-4">Features</h3>
                                    <ul className="flex flex-wrap gap-4">
                                        {selectedStudio.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="px-4 py-2 border border-current rounded-md text-sm uppercase"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default StudioCarousel;

