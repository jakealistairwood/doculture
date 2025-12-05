"use client";

import { PortableText } from "@portabletext/react";
import SanityImage from "@/components/atoms/SanityImage";
import ContactForm from "@/components/molecules/ContactForm";
import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import LogoMarquee from "@/components/molecules/LogoMarquee";
import Image from "next/image";
import Link from "next/link";

interface ContactLandingPageProps {
    data: {
        heading?: string;
        description?: string;
        whyUs?: any;
        image?: {
            asset?: {
                _ref: string;
                _type: "reference";
                _weak?: boolean;
                [key: string]: any;
            };
            media?: unknown;
            hotspot?: any;
            crop?: any;
            alt?: string;
            _type: "image";
        };
        logoMarqueeBlock?: {
            _id?: string;
            title?: string;
            logoMarquee?: {
                title?: string;
                speed?: number;
                logos?: Array<{
                    _key?: string;
                    alt?: string;
                    link?: string;
                    asset?: any;
                }>;
            };
        };
    };
    logoMarquee?: any;
}

export default function ContactLandingPage({ data, logoMarquee }: ContactLandingPageProps) {
    if (!data) {
        return null;
    }

    const { heading, description, whyUs, image, logoMarqueeBlock } = data;

    const logoMarqueeData = logoMarqueeBlock ? {
        logoMarqueeBlock: logoMarqueeBlock
    } : logoMarquee ? {
        logoMarqueeBlock: logoMarquee
    } : null;

    return (
        <main id="contact-landing-page" className="bg-off-black text-white min-h-screen py-20 flex items-center justify-center">
            <section className="">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
                        <div className="flex flex-col gap-y-12 md:gap-y-20">
                            <div className="flex flex-col gap-y-14">
                                <div className="flex flex-col gap-y-16">
                                    <Link
                                        href="/"
                                        className="relative block aspect-[117/23] w-[117px] h-[23px]"
                                        aria-label="Go to homepage"
                                    >
                                        <Image 
                                            src="/images/logo.svg" 
                                            alt="Logo" 
                                            fill 
                                            className="object-contain"
                                            priority 
                                        />
                                    </Link>
                                    <div className="flex flex-col gap-y-4">
                                        <h1 className="text-80px font-heading uppercase !leading-[0.94]" dangerouslySetInnerHTML={{ __html: heading }} />
                                        {description && (
                                            <p className="text-lg md:text-xl opacity-80 max-w-2xl">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full h-full relative flex items-center justify-center md:p-10 lg:hidden">
                                    <SanityImage image={image} className="hidden md:block w-full h-full object-cover absolute inset-0" />
                                    <div className="bg-white text-off-black relative z-[2] p-10 w-full">
                                        <ContactForm />
                                    </div>
                                </div>
                                {whyUs && (
                                    <div>
                                        <CaseStudyRichText content={whyUs} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <LogoMarquee data={logoMarqueeData} bgColor="off-black" disableInvertedLogoBg />
                            </div>
                        </div>
                        <div className="hidden w-full h-full relative lg:flex items-center justify-center p-10">
                            <SanityImage image={image} className="w-full h-full object-cover absolute inset-0" />
                            <div className="bg-white text-off-black relative z-[2] p-10">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
