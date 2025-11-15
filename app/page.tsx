import { client } from "@/sanity/lib/client";
import { pageQuery } from "@/sanity/lib/queries";
import { Page } from "@/sanity/types";
import { PageLayout } from "@/layout/PageLayout";
import Image from "next/image";

export default async function Home() {
    const page = await client.fetch<Page>(pageQuery, { slug: "/" });

    if (!page) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-gray-600">
                        Please create a page with slug &quot;home&quot; in
                        Sanity Studio.
                    </p>
                </div>
            </div>
        );
    }

    return <PageLayout page={page} />;
}
