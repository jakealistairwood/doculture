import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import OurWorks from "@/components/organisms/OurWorks";

export default async function OurWorkPage() {
    const projects = await client.fetch<Project[]>(allProjectsQuery);

    return <OurWorks projects={projects || []} />;
}

