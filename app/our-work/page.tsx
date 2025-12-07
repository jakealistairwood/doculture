import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import OurWorks from "@/components/organisms/OurWorks";
import { generateMetadataFromSEO } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

    // Create SEO data from the first project
    const seoData = {
        title: "Our Work",
        description: "Discover our case studies and portfolio",
    };

    return generateMetadataFromSEO(
        seoData
    );
}

export default async function OurWorkPage() {
    const projects = await client.fetch<Project[]>(allProjectsQuery);

    return <OurWorks projects={projects || []} />;
}

