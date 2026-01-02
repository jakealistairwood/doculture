"use client";

import ContactLandingPage from "@/components/organisms/landingPages/ContactLandingPage";
import AboutLandingPage from "@/components/organisms/landingPages/AboutLandingPage/AboutLandingPage";

interface LandingPageData {
    _id: string;
    _type: "landingPage";
    title?: string;
    slug?: {
        current?: string;
    };
    template?: "contact" | "about";
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
    aboutLandingPage?: {
        masthead?: {
            heading?: string;
            description?: string;
            asset?: any;
        };
        aboutUsContent?: Array<{
            _key?: string;
            _type?: string;
            title?: string;
            components?: Array<any>;
        }>;
    };
}

interface LandingPageLayoutProps {
    landingPage: LandingPageData;
    logoMarquee?: any;
    globalCTA?: any;
    globalOptions?: any;
}

export default function LandingPageLayout({ landingPage, logoMarquee, globalCTA, globalOptions }: LandingPageLayoutProps) {
    if (!landingPage) {
        return null;
    }

    const { template, contactLandingPage, aboutLandingPage } = landingPage;

    if (template === "contact" && contactLandingPage) {
        return (
            <ContactLandingPage data={contactLandingPage} logoMarquee={logoMarquee} />
        );
    }

    if (template === "about" && aboutLandingPage) {
        return (
            <AboutLandingPage data={aboutLandingPage} globalCTA={globalCTA} globalOptions={globalOptions} />
        );
    }

    return null;
}

