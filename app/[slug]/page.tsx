import { client } from "@/sanity/lib/client";
import { pageQuery, landingPageQuery, logoMarqueeQuery } from "@/sanity/lib/queries";
import { Page } from "@/sanity/types";
import { PageLayout } from "@/layout/PageLayout";
import LandingPageLayout from "@/components/organisms/LandingPageLayout";
import { generateMetadataFromSEO } from "@/lib/metadata";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const slugPath = `/${slug}`;
    
    // Try to fetch as regular page first
    let page = await client.fetch<Page>(pageQuery, { slug: slugPath });

    if (!page) {
        page = await client.fetch<Page>(pageQuery, { slug: slug });
    }

    // If not a regular page, try landing page
    if (!page) {
        let landingPage = await client.fetch(landingPageQuery, { slug: slugPath });

        if (!landingPage) {
            landingPage = await client.fetch(landingPageQuery, { slug: slug });
        }

        if (landingPage) {
            return generateMetadataFromSEO(
                landingPage.seo,
                landingPage.title || slug,
                ""
            );
        }
    }

    if (page) {
        return generateMetadataFromSEO(
            page.seo,
            page.title || slug,
            ""
        );
    }

    return generateMetadataFromSEO();
}

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const slugPath = `/${slug}`;
    
    // Try to fetch as regular page first
    let page = await client.fetch<Page>(pageQuery, { slug: slugPath });

    if (!page) {
        page = await client.fetch<Page>(pageQuery, { slug: slug });
    }

    // If not a regular page, try landing page
    if (!page) {
        let landingPage = await client.fetch(landingPageQuery, { slug: slugPath });

        if (!landingPage) {
            landingPage = await client.fetch(landingPageQuery, { slug: slug });
        }

        if (landingPage) {
            // Fetch logo marquee for landing pages (fallback if not selected in contactLandingPage)
            const logoMarquee = await client.fetch(logoMarqueeQuery);
            console.log('DynamicPage - landingPage:', landingPage);
            console.log('DynamicPage - logoMarquee from query:', logoMarquee);
            return <LandingPageLayout landingPage={landingPage} logoMarquee={logoMarquee} />;
        }
    }

    if (!page) {
        notFound();
    }

    return <PageLayout page={page} />;
}

