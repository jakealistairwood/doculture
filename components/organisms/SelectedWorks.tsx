"use client";

import { useState, useRef } from "react";
import SanityImage from "../atoms/SanityImage";
import VideoPlayer from "../atoms/VideoPlayer";
import Link from "next/link";
import type { SelectedWorks, Project } from "@/sanity/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import NumberFlow from "@number-flow/react"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SelectedWorksProps {
    data: SelectedWorks;
}

const SelectedWorks = ({ data }: SelectedWorksProps) => {
    const { caseStudies = [] } = data || {};
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedVideoPoster, setSelectedVideoPoster] = useState<any>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    // caseStudies are dereferenced in the query (see queries.ts), so they come as Project objects
    // Type assertion needed because SelectedWorks type defines them as references
    // Note: The query doesn't fetch _type, so we validate by checking for _id (references have _ref, not _id)
    const caseStudiesAsProjects = (caseStudies as unknown) as Array<Partial<Project> & { _id?: string }>;
    
    const projects = caseStudiesAsProjects.filter((item): item is Project => {
        // Validate that item is a dereferenced Project (has _id - references don't have _id, only _ref)
        return (
            item !== null &&
            typeof item === 'object' &&
            item._id !== undefined &&
            typeof item._id === 'string'
        );
    });

    if (!projects || projects.length === 0) {
        return null;
    }

    const handlePrevious = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handleWatchVideo = (video: string | undefined, poster: any) => {
        if (video) {
            setSelectedVideo(video);
            setSelectedVideoPoster(poster);
        }
    };

    const handleCloseVideo = () => {
        setSelectedVideo(null);
        setSelectedVideoPoster(null);
    };

    return (
        <div className="relative w-full max-w-full mx-auto px-4">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                loop={projects.length > 1}
                navigation={{
                    prevEl: ".swiper-button-prev-selected-works",
                    nextEl: ".swiper-button-next-selected-works",
                }}
                pagination={false}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveIndex(swiper.realIndex);
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                className="selected-works-carousel"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 50,
                    },
                }}
            >
                {projects.map((project, index) => (
                    <SwiperSlide key={project._id || index} className="w-full h-full">
                        <div className="flex flex-col aspect-video w-full mx-auto relative rounded-lg overflow-hidden">
                            {project.coverImage && (
                                <div className="w-full h-full absolute inset-0">
                                    <SanityImage
                                        image={project.coverImage}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="hidden lg:flex items-end justify-between relative p-10 mt-auto flex-wrap gap-y-6">
                                <div className="absolute h-full w-full inset-0" style={{
                                    background: "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
                                }} />
                                <div className="flex flex-col relative z-[2]">
                                    <div className="flex flex-col max-w-[420px]">
                                        {project.title && (
                                            <h2 className="selected-works-slide-text text-3xl xl:text-5xl font-heading !leading-[0.94] uppercase mb-4 relative z-[3]">
                                                {project.title}
                                            </h2>
                                        )}
                                        {project.categories && project.categories.length > 0 && (
                                            <ul className="selected-works-slide-text flex flex-wrap gap-4 relative z-[3]">
                                                {project.categories.map((category, categoryIndex) => {
                                                    // Categories are dereferenced by the query, so they have title directly
                                                    const categoryTitle = (category as any).title;
                                                    if (!categoryTitle) return null;
                                                    
                                                    return (
                                                        <li
                                                            key={categoryIndex}
                                                            className="py-1 px-2 border border-white/[25%] text-xs uppercase font-medium rounded-sm"
                                                        >
                                                            {categoryTitle}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                    {/* {project.excerpt && (
                                        <p className="selected-works-slide-text text-sm mb-6 max-w-[550px] relative z-[3] mt-4">
                                            {project.excerpt}
                                        </p>
                                    )} */}
                                </div>
                                <div className="selected-works-slide-text flex flex-wrap gap-4 relative z-[3]">
                                    {project.video && (
                                        <button
                                            onClick={() => handleWatchVideo(project.video, project.coverImage)}
                                            className="px-4 py-2 text-sm inline-flex items-center justify-center font-medium transition-colors rounded-[3px] bg-white text-black hover:bg-white/90"
                                        >
                                            Watch video
                                        </button>
                                    )}
                                    {project.slug?.current && (
                                        <Link
                                            href={`/our-work/${project.slug.current}`}
                                            className="px-4 py-2 text-sm inline-flex items-center justify-center font-medium transition-colors rounded-[3px] border border-white/25 text-white hover:bg-white/100 hover:text-off-black"
                                        >
                                            View case study
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-between relative pt-8 mt-auto flex-wrap gap-y-6 lg:hidden">
                                <div className="flex flex-col relative z-[2]">
                                    <div className="flex flex-col max-w-[420px]">
                                        {project.title && (
                                            <h2 className="selected-works-slide-text text-3xl xl:text-5xl font-heading !leading-[0.94] uppercase mb-4 relative z-[3]">
                                                {project.title}
                                            </h2>
                                        )}
                                        {project.categories && project.categories.length > 0 && (
                                            <div className="selected-works-slide-text relative z-[3]">
                                                <span className="text-xs uppercase font-medium opacity-75 md:hidden">
                                                    {project.categories
                                                        .map((category) => {
                                                            const categoryTitle = (category as any).title;
                                                            return categoryTitle;
                                                        })
                                                        .filter(Boolean)
                                                        .join(", ")}
                                                </span>
                                                <ul className="hidden md:flex flex-wrap gap-4">
                                                    {project.categories.map((category, categoryIndex) => {
                                                        // Categories are dereferenced by the query, so they have title directly
                                                        const categoryTitle = (category as any).title;
                                                        if (!categoryTitle) return null;
                                                        
                                                        return (
                                                            <li
                                                                key={categoryIndex}
                                                                className="py-1 px-2 border border-white/[25%] text-xs uppercase font-medium rounded-sm"
                                                            >
                                                                {categoryTitle}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    {/* {project.excerpt && (
                                        <p className="selected-works-slide-text text-sm mb-6 max-w-[550px] relative z-[3] mt-4">
                                            {project.excerpt}
                                        </p>
                                    )} */}
                                </div>
                                <div className="selected-works-slide-text flex flex-wrap gap-4 relative z-[3]">
                                    {project.video && (
                                        <button
                                            onClick={() => handleWatchVideo(project.video, project.coverImage)}
                                            className="px-4 py-2 text-sm inline-flex items-center justify-center font-medium transition-colors rounded-[3px] bg-white text-black hover:bg-white/90"
                                        >
                                            Watch video
                                        </button>
                                    )}
                                    {project.slug?.current && (
                                        <Link
                                            href={`/our-work/${project.slug.current}`}
                                            className="px-4 py-2 text-sm inline-flex items-center justify-center font-medium transition-colors rounded-[3px] border border-white/25 text-white hover:bg-white/100 hover:text-off-black"
                                        >
                                            View case study
                                        </Link>
                                    )}
                                </div>
                            </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Controls - Below Carousel */}
            {projects.length > 1 && (
                <div className="flex items-center justify-between gap-4 mt-8 z-20 relative">
                    {/* Slide Indicator */}
                    <div className="text-2xl md:text-4xl font-heading uppercase font-medium tabular-nums">
                        <span>0<NumberFlow value={activeIndex + 1} trend={0} format={{ notation: "compact" }} /></span>
                        <span>/</span>
                        <span>{String(projects.length).padStart(2, '0')}</span>
                        {/* {String(activeIndex + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')} */}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevious}
                            className="swiper-button-prev-selected-works p-2 bg-white/10 text-white hover:bg-accent-orange hover:text-off-black transition-colors"
                            aria-label="Previous case study"
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
                            className="swiper-button-next-selected-works p-2 bg-white/10 text-white hover:bg-accent-orange hover:text-off-black transition-colors"
                            aria-label="Next case study"
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

            {/* Video Modal */}
            {selectedVideo && (
                <VideoPlayer
                    video={selectedVideo}
                    poster={selectedVideoPoster}
                    isOpen={!!selectedVideo}
                    onClose={handleCloseVideo}
                    showPosterButton={false}
                />
            )}

            <style jsx global>{`
                .selected-works-carousel {
                    overflow: hidden;
                }
                
                /* Hide text elements by default */
                .selected-works-carousel .selected-works-slide-text {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.4s ease-out, transform 0.6s ease-out;
                }
                
                /* Show text elements when slide is active */
                .selected-works-carousel .swiper-slide-active .selected-works-slide-text {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Stagger animation for multiple text elements */
                .selected-works-carousel .swiper-slide-active .selected-works-slide-text:nth-child(1) {
                    transition-delay: 0.1s;
                }
                
                .selected-works-carousel .swiper-slide-active .selected-works-slide-text:nth-child(2) {
                    transition-delay: 0.2s;
                }
                
                .selected-works-carousel .swiper-slide-active .selected-works-slide-text:nth-child(3) {
                    transition-delay: 0.3s;
                }
                
                .selected-works-carousel .swiper-slide-active .selected-works-slide-text:nth-child(4) {
                    transition-delay: 0.4s;
                }
            `}</style>
        </div>
    );
};

export default SelectedWorks;
