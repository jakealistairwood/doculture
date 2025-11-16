"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import SanityImage from "./SanityImage"

interface VideoPlayerProps {
    video?: string;
    poster?: any;
    options?: {
        title?: string;
    }
}


const VideoPlayer = (props: VideoPlayerProps) => {
    const [playVideo, setPlayVideo] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close modal on Escape key
    useEffect(() => {
        if (!playVideo) return;
        
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setPlayVideo(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [playVideo]);

    const modalContent = playVideo ? (
        <div 
            className="fixed inset-0 h-screen w-screen bg-black/80 flex items-center justify-center z-[9999]"
            onClick={(e) => {
                // Close modal when clicking on backdrop
                if (e.target === e.currentTarget) {
                    setPlayVideo(false);
                }
            }}
        >
            <div className="relative aspect-[16/9] max-w-[800px] w-full mx-auto bg-black rounded-lg overflow-hidden">
                <button
                    onClick={() => setPlayVideo(false)}
                    className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                    aria-label="Close video"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {props.video ? (
                    <video
                        className="w-full h-full"
                        controls
                        autoPlay
                        poster={props.poster}
                    >
                        <source src={props.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <p>No video URL provided</p>
                    </div>
                )}
            </div>
        </div>
    ) : null;

    return (
        <>
            {props?.poster && (
                <button 
                    type="button" 
                    onClick={() => setPlayVideo(true)}
                    className="flex items-center justify-center rounded-[10px] overflow-hidden max-w-[1180px] w-full mx-auto aspect-[16/9]"
                >
                    <SanityImage image={props?.poster} className="w-full h-full object-cover" />
                </button>
            )}
            {mounted && createPortal(modalContent, document.body)}
        </>
    )
}

export default VideoPlayer