"use client";

import Header from "@/components/globals/Header";
import GlobalCTA from "@/components/globals/GlobalCTA";
import Footer from "@/components/globals/Footer";
import Masthead from "./components/Masthead";
import OurMission from "./components/OurMission";
import WhyWeExist from "./components/WhyWeExist";
import OurJourney from "./components/OurJourney";
import OurValues from "./components/OurValues";
import MeetTheTeam from "./components/MeetTheTeam";

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

export default function AboutLandingPage({ data, globalCTA, globalOptions }: AboutLandingPageProps) {
    if (!data) {
        return null;
    }

    const { masthead, ourMission, whyWeExist, ourJourney, ourValues, meetTheTeam } = data;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-off-black text-white">
                <Masthead masthead={masthead} />
                <OurMission ourMission={ourMission} />
                <WhyWeExist whyWeExist={whyWeExist} />
                <OurJourney ourJourney={ourJourney} />
                <OurValues ourValues={ourValues} />
                <MeetTheTeam meetTheTeam={meetTheTeam} />
            </main>
            {globalCTA?.globalCTA && <GlobalCTA data={globalCTA.globalCTA} />}
            <Footer globalOptions={globalOptions} />
        </>
    );
}

