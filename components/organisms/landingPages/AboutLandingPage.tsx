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
import LinksWrapper from "@/components/molecules/LinksWrapper";

interface AboutLandingPageData {
    masthead?: {
        heading?: string;
        subheading?: string;
        description?: string;
        links?: any;
        leftTopImage?: any;
        leftBottomImage?: any;
        rightTopImage?: any;
        rightBottomImage?: any;
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
    ourMission?: {
        subheading?: string;
        heading?: string;
        images?: Array<{
            asset?: any;
            altText?: string;
        }>;
    };
    whyWeExist?: {
        heading?: string;
        content?: any;
    };
    ourJourney?: {
        heading?: string;
        content?: any;
        image?: {
            asset?: any;
            altText?: string;
        };
    };
    ourValues?: {
        heading?: string;
        values?: Array<{
            icon?: {
                asset?: any;
                altText?: string;
            };
            heading?: string;
            description?: string;
        }>;
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

    const { masthead, ourMission, whyWeExist, ourJourney, ourValues, aboutUsContent, meetTheTeam } = data;

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
            <section className="relative min-h-screen flex items-center justify-center">
                <div className="container">
                    <div className="flex flex-col gap-y-12 items-center text-center relative">
                        <div className="flex flex-col gap-y-4 md:gap-y-8 items-center text-center max-w-[722px] w-full mx-auto relative z-[2]" style={{
                            maxWidth: `${masthead?.mastheadMaxWidth}px`
                        }}>
                            <div className="flex flex-col">
                                {masthead?.subheading && (
                                    <h1 className="!font-mono uppercase">{masthead?.subheading}</h1>
                                )}
                            </div>
                            {masthead?.heading && (
                                <h1 className="text-80px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: masthead.heading }} />
                            )}
                            {masthead?.description && (
                                <p className="font-serif font-light text-2xl md:text-4xl">
                                    {masthead.description}
                                </p>
                            )}
                            {masthead?.links && (
                                <LinksWrapper links={masthead.links} />
                            )}
                        </div>
                    </div>
                    {/* Four absolutely positioned images */}
                    {masthead?.leftTopImage && (
                        <div className="absolute top-0 left-0 aspect-[285/186] max-w-[286px] overflow-hidden">
                            <SanityImage
                                image={masthead.leftTopImage}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    )}
                    {masthead?.leftBottomImage && (
                        <div className="absolute bottom-0 left-0 aspect-[219/290] max-w-[219px] overflow-hidden">
                            <SanityImage
                                image={masthead.leftBottomImage}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    )}
                    {masthead?.rightTopImage && (
                        <div className="absolute top-0 right-0 aspect-[285/186] max-w-[285px] overflow-hidden">
                            <SanityImage
                                image={masthead.rightTopImage}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    )}
                    {masthead?.rightBottomImage && (
                        <div className="absolute bottom-0 right-0 aspect-[233/309] max-w-[233px] overflow-hidden">
                            <SanityImage
                                image={masthead.rightBottomImage}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-off-black text-white">
                <div className="container">
                    <div className="flex flex-col gap-y-12 md:gap-y-20">
                        <div className="flex flex-col gap-y-6 max-w-[786px] mx-auto items-center text-center">
                            {ourMission?.subheading && (
                                <h2 className="!font-mono uppercase opacity-75" dangerouslySetInnerHTML={{ __html: ourMission?.subheading }} />
                            )}
                            {ourMission?.heading && (
                                <h3 className="text-2xl" dangerouslySetInnerHTML={{ __html: ourMission?.heading }} />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Exist Section */}
            {whyWeExist && (
                <section className="py-12 lg:py-36">
                    <div className="container">
                        <div className="flex justify-between">
                            {whyWeExist.heading && (
                                <h2 className="font-heading text-80px uppercase leading-[0.94] mb-8" dangerouslySetInnerHTML={{ __html: whyWeExist?.heading }} />
                            )}
                            {whyWeExist.content && (
                                <div className="max-w-[640px] w-full">
                                    <CaseStudyRichText content={whyWeExist.content} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Our Journey Section */}
            {ourJourney && (
                <section className="py-12 lg:py-36">
                    <div className="container">
                        <div className="bg-white text-black grid grid-cols-1 md:grid-cols-2">
                            <div className="px-6 md:px-10 py-10 md:py-16 flex flex-col gap-y-12 md:gap-y-20">
                                {ourJourney.heading && (
                                    <h2 className="font-heading text-80px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: ourJourney?.heading }} />
                                )}
                                {ourJourney.content && (
                                    <CaseStudyRichText content={ourJourney.content} />
                                )}
                            </div>
                            {ourJourney.image && (
                                <div className="">
                                    <SanityImage
                                        image={ourJourney.image}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Our Values Section */}
            {ourValues && (
                <section className="py-12 lg:py-36">
                    <div className="container">
                        <div className="flex flex-col gap-y-12 md:gap-y-20">
                            {ourValues.heading && (
                                <h2 className="font-heading text-80px uppercase leading-[0.94] text-center" dangerouslySetInnerHTML={{ __html: ourValues?.heading }} />
                            )}
                            {ourValues.values && ourValues.values.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                    {ourValues.values.map((value, index) => (
                                        <div key={index} className="flex flex-col gap-y-16 gap-y-4 p-8 border border-white/10">
                                            {value.icon && (
                                                <div className="w-16 h-16 relative aspect-square flex items-center justify-center bg-[#242020] rounded-lg">
                                                    <div className="flex items-center justify-center flex-none">
                                                        <SanityImage
                                                            image={value.icon}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-y-4 mt-auto">
                                                {value.heading && (
                                                    <h3 className="text-2xl md:text-3xl font-heading uppercase">{value.heading}</h3>
                                                )}
                                                {value.description && (
                                                    <p className="text-lg opacity-85">{value.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Meet The Team Section */}
            {meetTheTeam && (
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
            )}
            </main>
            {globalCTA?.globalCTA && <GlobalCTA data={globalCTA.globalCTA} />}
            <Footer globalOptions={globalOptions} />
        </>
    );
}

