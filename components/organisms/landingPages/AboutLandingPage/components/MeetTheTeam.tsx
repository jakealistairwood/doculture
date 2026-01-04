"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SanityImage from "@/components/atoms/SanityImage";
import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import HeaderMarquee from "@/components/molecules/HeaderMarquee";
import clsx from "clsx";

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
                    <div className="bg-dark-grey grid grid-cols-2 text-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                        <div className="h-full">
                            {selectedMember.headshot && (
                                <div className="h-full">
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


