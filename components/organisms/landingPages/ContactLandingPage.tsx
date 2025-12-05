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

    // Structure logo marquee data for LogoMarquee component
    // Use logoMarqueeBlock from data first, fallback to logoMarquee prop
    const logoMarqueeData = logoMarqueeBlock ? {
        logoMarqueeBlock: logoMarqueeBlock
    } : logoMarquee ? {
        logoMarqueeBlock: logoMarquee
    } : null;

    return (
        <main id="contact-landing-page" className="bg-off-black text-white min-h-screen py-20">
            <section className="">
                <div className="container">
                    <div className="grid grid-cols-2 gap-40">
                        <div className="flex flex-col gap-y-20">
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
                        <div className="w-full h-full">
                            <SanityImage image={image} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
        // <main className="min-h-screen bg-off-black text-white">
        //     {/* Hero Section */}
        //     <section className="pt-40 pb-20">
        //         <div className="container">
        //             <div className="flex flex-col items-center text-center gap-y-8 max-w-4xl mx-auto">
        //                 {heading && (
        //                     <h1
        //                         className="text-100px uppercase leading-[0.94]"
        //                         dangerouslySetInnerHTML={{ __html: heading }}
        //                     />
        //                 )}
        //                 {description && (
        //                     <p className="text-lg md:text-xl opacity-80 max-w-2xl">
        //                         {description}
        //                     </p>
        //                 )}
        //             </div>
        //         </div>
        //     </section>

        //     {/* Content Section */}
        //     <section className="py-36">
        //         <div className="container">
        //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-7xl mx-auto">
        //                 {/* Left Column - Contact Form */}
        //                 <div>
        //                     <ContactForm submitButtonText="Send Message" />
        //                 </div>

        //                 {/* Right Column - Why Us & Image */}
        //                 <div className="flex flex-col gap-y-12">
        //                     {whyUs && (
        //                         <div>
        //                             <h2 className="text-4xl md:text-5xl font-heading uppercase mb-8">
        //                                 Why Us
        //                             </h2>
        //                             <CaseStudyRichText content={whyUs} />
        //                         </div>
        //                     )}
                            
        //                     {image && (
        //                         <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        //                             <SanityImage
        //                                 image={image}
        //                                 className="w-full h-full object-cover"
        //                             />
        //                         </div>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </main>
    );
}
