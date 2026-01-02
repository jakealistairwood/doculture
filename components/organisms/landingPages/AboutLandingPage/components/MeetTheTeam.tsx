"use client";

import SanityImage from "@/components/atoms/SanityImage";
import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import HeaderMarquee from "@/components/molecules/HeaderMarquee";

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
    if (!meetTheTeam) return null;

    return (
        <section className="py-12 md:py-20 bg-dark-grey text-white overflow-hidden">
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
                            {meetTheTeam.teamMembers.map((member) => (
                                <div key={member._id} className="flex flex-col gap-y-6">
                                    {member.headshot && (
                                        <div className="relative aspect-369/553 overflow-hidden">
                                            <SanityImage
                                                image={member.headshot}
                                                className="w-full h-full object-cover"
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
                                        {member.content && (
                                            <div className="prose prose-lg max-w-none text-white">
                                                <CaseStudyRichText content={member.content} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

