import { client } from "@/sanity/lib/client";
import { pageQuery } from "@/sanity/lib/queries";
import { Page } from "@/sanity/types";
import { PageLayout } from "@/layout/PageLayout";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const slugPath = `/${slug}`;
    
    let page = await client.fetch<Page>(pageQuery, { slug: slugPath });

    if (!page) {
        page = await client.fetch<Page>(pageQuery, { slug: slug });
    }

    if (!page) {
        notFound();
    }

    return <PageLayout page={page} />;
}

