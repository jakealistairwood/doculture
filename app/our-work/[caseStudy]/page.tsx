import { client } from "@/sanity/lib/client";
import { projectQuery } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import { notFound } from "next/navigation";
import CaseStudyLayout from "@/components/organisms/CaseStudyLayout";

interface CaseStudyPageProps {
    params: Promise<{
        caseStudy: string;
    }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { caseStudy } = await params;
    
    const project = await client.fetch<Project>(projectQuery, { slug: caseStudy });

    if (!project) {
        notFound();
    }

    return <CaseStudyLayout project={project} />;
}

