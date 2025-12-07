"use client";

import { useEffect, useMemo, useState } from "react";
import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import CaseStudyImage from "@/components/molecules/CaseStudyImage";
import SanityImage from "@/components/atoms/SanityImage";
import VideoPlayer from "@/components/atoms/VideoPlayer";
import TableOfContents from "@/components/molecules/TableOfContents";
import Header from "@/components/globals/Header";
import GlobalCTA from "@/components/globals/GlobalCTA";
import Footer from "@/components/globals/Footer";
import HeaderMarquee from "@/components/molecules/HeaderMarquee";

interface AboutLandingPageData {
    masthead?: {
        heading?: string;
        description?: string;
        asset?: {
            id?: string;
            type?: "image" | "video";
            image?: {
                asset?: {
                    _ref?: string;
                    _type?: string;
                };
                [key: string]: any;
            };
            video?: string;
            videoPoster?: {
                asset?: {
                    _ref?: string;
                    _type?: string;
                };
                [key: string]: any;
            };
            videoOptions?: {
                title?: string;
                showTitleOnPoster?: boolean;
            };
        };
        mastheadMaxWidth?: number;
    };
    aboutUsContent?: Array<{
        _key?: string;
        _type?: string;
        title?: string;
        components?: Array<{
            _key?: string;
            _type?: string;
            content?: any;
            type?: "image" | "video";
            image?: any;
            video?: string;
            videoPoster?: any;
            videoOptions?: any;
        }>;
    }>;
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

interface AboutLandingPageProps {
    data: AboutLandingPageData;
    globalCTA?: {
        globalCTA?: {
            image?: any;
            heading?: string;
            description?: string;
            link?: {
                url?: string;
                title?: string;
            };
        };
    } | null;
    globalOptions?: {
        contactEmail?: string;
        contactMobile?: string;
        companyAddress?: any;
        instagramUrl?: string;
        linkedinUrl?: string;
    } | null;
}

interface Heading {
    id: string;
    text: string;
}

export default function AboutLandingPage({ data, globalCTA, globalOptions }: AboutLandingPageProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);

    // Extract h2 headings from all rich text blocks
    const extractHeadings = useMemo(() => {
        const extracted: Heading[] = [];
        
        if (!data.aboutUsContent) return extracted;

        data.aboutUsContent.forEach((section: any) => {
            if (section._type === 'caseStudyBuilder' && section.components) {
                section.components.forEach((component: any) => {
                    if (component._type === 'caseStudyRichText' && component.content) {
                        component.content.forEach((block: any) => {
                            if (block._type === 'block' && block.style === 'h2' && block.children) {
                                const text = block.children
                                    .filter((child: any) => child._type === 'span')
                                    .map((span: any) => span.text || '')
                                    .join('');
                                
                                if (text) {
                                    const id = text
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/^-|-$/g, '');
                                    extracted.push({ id, text });
                                }
                            }
                        });
                    }
                });
            }
        });

        return extracted;
    }, [data.aboutUsContent]);

    useEffect(() => {
        setHeadings(extractHeadings);
    }, [extractHeadings]);

    if (!data) {
        return null;
    }

    const { masthead, aboutUsContent, meetTheTeam } = data;

    // Determine asset type and content
    const asset = masthead?.asset;
    const assetType = asset?.type;
    const hasVideo = assetType === "video" && asset?.video;
    const hasImage = assetType === "image" && asset?.image;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-off-black text-white">
                {/* Masthead Section */}
                <section className="pt-40">
                <div className="container">
                    <div className="flex flex-col gap-y-12 items-center text-center">
                        <div className="flex flex-col gap-y-8 items-center text-center max-w-[856px] w-full mx-auto" style={{
                            maxWidth: `${masthead?.mastheadMaxWidth}px`
                        }}>
                            {masthead?.heading && (
                                <h1 className="text-100px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: masthead.heading }} />
                            )}
                            {masthead?.description && (
                                <p className="font-serif font-light text-4xl">
                                    {masthead.description}
                                </p>
                            )}
                        </div>
                        {hasVideo ? (
                            <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                                <VideoPlayer
                                    video={asset.video!}
                                    poster={asset.videoPoster}
                                    options={asset.videoOptions}
                                    buttonClassName="relative flex items-center justify-center rounded-lg overflow-hidden w-full h-full cursor-pointer group"
                                />
                            </div>
                        ) : hasImage && (
                            <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                                <SanityImage
                                    image={asset.image}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Section with Table of Contents */}
            <section className="py-16 lg:py-36">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-[210px_auto] gap-16 md:gap-20 lg:gap-40 relative">
                        <aside className="relative">
                            {headings.length > 0 && (
                                <div className="sticky top-20">
                                    <TableOfContents headings={headings} />
                                </div>
                            )}
                        </aside>
                        <article className="max-w-768px">
                            {/* Content */}
                            {aboutUsContent && aboutUsContent.length > 0 && (
                                <div className="space-y-12 md:space-y-20">
                                    {aboutUsContent.map((section: any) => {
                                        if (section._type === 'caseStudyBuilder' && section.components) {
                                            return (
                                                <div key={section._key} className="space-y-8 md:space-y-20">
                                                    {section.components.map((component: any) => {
                                                        if (component._type === 'caseStudyRichText') {
                                                            return (
                                                                <CaseStudyRichText
                                                                    key={component._key}
                                                                    content={component.content}
                                                                />
                                                            );
                                                        }
                                                        if (component._type === 'caseStudyImage') {
                                                            return (
                                                                <CaseStudyImage
                                                                    key={component._key}
                                                                    type={component.type}
                                                                    image={component.image}
                                                                    video={component.video}
                                                                    videoPoster={component.videoPoster}
                                                                    videoOptions={component.videoOptions}
                                                                />
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </article>
                    </div>
                </div>
            </section>

            {/* Meet The Team Section */}
            {meetTheTeam && (
                <section className="py-20 bg-dark-grey text-white overflow-hidden">
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
                                        <div key={member._id} className="flex flex-col">
                                            {member.headshot && (
                                                <div className="relative aspect-369/553 mb-6 overflow-hidden">
                                                    <SanityImage
                                                        image={member.headshot}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            {member.name && (
                                                <h3 className="text-2xl md:text-3xl font-heading uppercase mb-2">
                                                    {member.name}
                                                </h3>
                                            )}
                                            {member.role && (
                                                <p className="text-lg opacity-70 mb-4">
                                                    {member.role}
                                                </p>
                                            )}
                                            {member.content && (
                                                <div className="prose prose-lg max-w-none text-white">
                                                    <CaseStudyRichText content={member.content} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
            </main>
            {globalCTA?.globalCTA && <GlobalCTA data={globalCTA.globalCTA} />}
            <Footer globalOptions={globalOptions} />
        </>
    );
}

