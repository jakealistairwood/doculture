"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SanityImage from "@/components/atoms/SanityImage";
import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import HeaderMarquee from "@/components/molecules/HeaderMarquee";
import clsx from "clsx";
import { motion } from "framer-motion";

interface MeetTheTeamProps {
    meetTheTeam?: {
        heading?: string;
        teamMembers?: Array<{
            _id?: string;
            name?: string;
            role?: string;
            headshot?: {
                asset?: {
                    _ref?: string;
                    _type?: string;
                };
                [key: string]: any;
            };
            content?: any;
        }>;
    };
}

const arrowAnimation = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        scale: [0, 1.2, 1],
        opacity: 1,
    }
}

export default function MeetTheTeam({ meetTheTeam }: MeetTheTeamProps) {
    const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!selectedMemberId) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedMemberId(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [selectedMemberId]);

    if (!meetTheTeam) return null;

    const selectedMember = meetTheTeam.teamMembers?.find(
        (member) => member._id === selectedMemberId
    );

    return (
        <section className="py-12 md:py-20 bg-dark-grey text-white overflow-hidden" id="meet-the-team">
            <div className="container">
                <div className="flex flex-col gap-y-12 md:gap-y-20">
                    {meetTheTeam.heading && (
                        <div className="">
                            <HeaderMarquee 
                                data={{ items: [meetTheTeam.heading, meetTheTeam.heading, meetTheTeam.heading] }} 
                                bgColor="dark-grey"
                            />
                        </div>
                    )}
                    {meetTheTeam.teamMembers && meetTheTeam.teamMembers.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-10">
                            {meetTheTeam.teamMembers.map((member) => {
                                const isHovered = hoveredMemberId === member._id;
                                const hasHoveredMember = hoveredMemberId !== null;
                                const isInactive = hasHoveredMember && !isHovered;
                                const hasContent = !!member.content;

                                return (
                                    <div 
                                        key={member._id} 
                                        className={clsx(
                                            "flex flex-col gap-y-6 transition-opacity duration-300",
                                            isInactive && "opacity-30",
                                            hasContent && "cursor-pointer"
                                        )}
                                        onMouseEnter={() => setHoveredMemberId(member._id || null)}
                                        onMouseLeave={() => setHoveredMemberId(null)}
                                        onClick={() => {
                                            if (hasContent) {
                                                setSelectedMemberId(member._id || null);
                                            }
                                        }}
                                    >
                                        {member.headshot && (
                                            <div className="relative aspect-369/553 overflow-hidden">
                                                <SanityImage
                                                    image={member.headshot}
                                                    className={clsx(
                                                        "w-full h-full object-cover transition-all duration-400 ease",
                                                        isHovered && "scale-[1.05]",
                                                        isInactive && "grayscale blur-sm"
                                                    )}
                                                />
                                                {member?.content && (
                                                    <motion.div 
                                                        className="origin-center will-change-transform absolute top-6 right-6 w-[36px] h-[36px] bg-off-black text-white flex items-center justify-center rounded-full" 
                                                        variants={arrowAnimation} 
                                                        initial="initial" 
                                                        animate={isHovered ? "animate" : "initial"}
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.5855 9.39779L10.523 14.4603C10.4174 14.5658 10.2743 14.6251 10.125 14.6251C9.97573 14.6251 9.83258 14.5658 9.72703 14.4603C9.62148 14.3547 9.56219 14.2116 9.56219 14.0623C9.56219 13.9131 9.62148 13.7699 9.72703 13.6644L13.8298 9.56232H2.8125C2.66332 9.56232 2.52024 9.50306 2.41475 9.39757C2.30926 9.29208 2.25 9.14901 2.25 8.99982C2.25 8.85064 2.30926 8.70757 2.41475 8.60208C2.52024 8.49659 2.66332 8.43732 2.8125 8.43732H13.8298L9.72703 4.33529C9.62148 4.22975 9.56219 4.08659 9.56219 3.93732C9.56219 3.78806 9.62148 3.6449 9.72703 3.53936C9.83258 3.43381 9.97573 3.37451 10.125 3.37451C10.2743 3.37451 10.4174 3.43381 10.523 3.53936L15.5855 8.60186C15.6378 8.6541 15.6793 8.71613 15.7076 8.78442C15.7359 8.85271 15.7504 8.9259 15.7504 8.99982C15.7504 9.07375 15.7359 9.14694 15.7076 9.21523C15.6793 9.28351 15.6378 9.34555 15.5855 9.39779Z" fill="currentColor"/>
                                                        </svg>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            {member.name && (
                                                <h3 className="text-2xl md:text-3xl font-heading uppercase">
                                                    {member.name}
                                                </h3>
                                            )}
                                            {member.role && (
                                                <p className="text-lg opacity-70">
                                                    {member.role}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            {mounted && selectedMember && createPortal(
                <div
                    className="fixed inset-0 h-screen w-screen bg-black/80 flex items-center justify-center z-[9999] p-4 team-member-card"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedMemberId(null);
                        }
                    }}
                >
                    <div className="bg-dark-grey grid grid-cols-1 lg:grid-cols-2 text-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedMemberId(null)}
                            className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                            aria-label="Close modal"
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
                        <div className="h-full relative">
                            {selectedMember.headshot && (
                                <div className="lg:absolute w-full inset-0 h-full">
                                    <div className="relative h-full w-full overflow-hidden">
                                        <SanityImage
                                            image={selectedMember.headshot}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-4 p-10">
                            <div className="flex flex-col gap-y-2 border-b border-white/25 pb-6">
                                {selectedMember.name && (
                                    <h2 className="text-3xl md:text-4xl font-heading uppercase">
                                        {selectedMember.name}
                                    </h2>
                                )}
                                {selectedMember.role && (
                                    <p className="text-xl opacity-70">
                                        {selectedMember.role}
                                    </p>
                                )}
                            </div>
                            {selectedMember.content && (
                                <div className="prose prose-lg max-w-none text-white">
                                    <CaseStudyRichText content={selectedMember.content} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}


