"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SanityImage from "./SanityImage";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
    video?: string;
    poster?: any;
    options?: {
        title?: string;
    };
}

const VideoPlayer = (props: VideoPlayerProps) => {
    const [playVideo, setPlayVideo] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!playVideo) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setPlayVideo(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
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
                if (e.target === e.currentTarget) {
                    setPlayVideo(false);
                }
            }}
        >
            <div className="relative aspect-[16/9] max-w-[1100px] w-full mx-auto bg-black rounded-lg overflow-hidden">
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
                {props.video && (
                    <ReactPlayer
                        src={props.video}
                        playing
                        width="100%"
                        height="100%"
                    />
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
                    className="relative flex items-center justify-center md:rounded-[10px] overflow-hidden max-w-[1180px] w-full mx-auto aspect-[16/9] cursor-pointer group"
                    aria-label="Play Video"
                >
                    <SanityImage
                        image={props?.poster}
                        className="w-full h-full object-cover relative z-[2] scale-100 group-hover:scale-[1.02] duration-400 ease transition-transform will-change-transform"
                    />
                    <div
                        className="w-[45px] md:w-[75px] aspect-square rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] flex items-center justify-center flex-none bg-black/25 backdrop-blur-md"
                        aria-hidden
                    >
                        <div className="relative aspect-[31/37] w-1/3">
                            <PlayIcon />
                        </div>
                    </div>
                </button>
            )}
            {mounted && createPortal(modalContent, document.body)}
        </>
    );
};

export default VideoPlayer;

const PlayIcon = () => {
    return (
        <svg
            width="31"
            height="37"
            viewBox="0 0 31 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <path
                d="M28.6875 18.5C28.6885 18.8926 28.5878 19.2787 28.3953 19.6209C28.2028 19.9631 27.9251 20.2496 27.5891 20.4526L6.765 33.1916C6.41391 33.4066 6.0118 33.5239 5.60019 33.5316C5.18858 33.5392 4.7824 33.4368 4.42359 33.2349C4.06821 33.0362 3.77216 32.7465 3.56589 32.3954C3.35963 32.0444 3.25059 31.6447 3.25 31.2375V5.76245C3.25059 5.35528 3.35963 4.95562 3.56589 4.60457C3.77216 4.25351 4.06821 3.96373 4.42359 3.76503C4.7824 3.56319 5.18858 3.46079 5.60019 3.46841C6.0118 3.47604 6.41391 3.5934 6.765 3.80839L27.5891 16.5474C27.9251 16.7504 28.2028 17.0369 28.3953 17.3791C28.5878 17.7213 28.6885 18.1074 28.6875 18.5Z"
                fill="white"
            />
        </svg>
    );
};
