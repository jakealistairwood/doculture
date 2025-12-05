"use client";

import SanityImage from "@/components/atoms/SanityImage";
import ContactForm from "@/components/molecules/ContactForm";
import ContactLandingPage from "@/components/organisms/landingPages/ContactLandingPage";

interface LandingPageData {
    _id: string;
    _type: "landingPage";
    title?: string;
    slug?: {
        current?: string;
    };
    template?: "contact";
    contactLandingPage?: {
        heading?: string;
        description?: string;
        whyUs?: any;
        image?: any;
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
}

interface LandingPageLayoutProps {
    landingPage: LandingPageData;
    logoMarquee?: any;
}

export default function LandingPageLayout({ landingPage, logoMarquee }: LandingPageLayoutProps) {
    if (!landingPage) {
        return null;
    }

    const { template, contactLandingPage } = landingPage;

    if (template === "contact" && contactLandingPage) {
        return (
            <ContactLandingPage data={contactLandingPage} logoMarquee={logoMarquee} />
        );
    }

    return null;
}

