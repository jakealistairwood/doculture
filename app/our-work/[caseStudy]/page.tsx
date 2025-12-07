import { client } from "@/sanity/lib/client";
import { projectQuery } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import { notFound } from "next/navigation";
import CaseStudyLayout from "@/components/organisms/CaseStudyLayout";
import { generateMetadataFromSEO } from "@/lib/metadata";
import type { Metadata } from "next";

interface CaseStudyPageProps {
    params: Promise<{
        caseStudy: string;
    }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
    const { caseStudy } = await params;
    const project = await client.fetch<Project>(projectQuery, { slug: caseStudy });

    if (!project) {
        return generateMetadataFromSEO(
            undefined,
            "Case Study",
            "View our case study"
        );
    }

    // Create SEO data from the project
    const seoData = {
        title: project.title || "Case Study",
        description: project.excerpt || "View our case study",
        ogImage: project.coverImage ? {
            asset: project.coverImage.asset,
            alt: project.title || "Case Study"
        } : undefined
    };

    return generateMetadataFromSEO(
        seoData,
        project.title || "Case Study",
        project.excerpt || "View our case study"
    );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { caseStudy } = await params;
    
    const project = await client.fetch<Project>(projectQuery, { slug: caseStudy });

    if (!project) {
        notFound();
    }

    return <CaseStudyLayout project={project} />;
}

