"use client";

import { Project } from "@/sanity/types";
import { useEffect, useMemo, useState } from "react";
import CaseStudyRichText from "@/components/molecules/CaseStudyRichText";
import CaseStudyImage from "@/components/molecules/CaseStudyImage";
import SanityImage from "@/components/atoms/SanityImage";
import VideoPlayer from "@/components/atoms/VideoPlayer";
import TableOfContents from "@/components/molecules/TableOfContents";

// Helper type for dereferenced category (categories are dereferenced in query)
type DereferencedCategory = {
    _id: string;
    title?: string;
    slug?: {
        current?: string;
    };
};

interface CaseStudyLayoutProps {
    project: Project;
}

interface Heading {
    id: string;
    text: string;
}

export default function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);

    // Extract h2 headings from all rich text blocks
    const extractHeadings = useMemo(() => {
        const extracted: Heading[] = [];
        
        if (!project.content) return extracted;

        project.content.forEach((section: any) => {
            if (section._type === 'caseStudyBuilder' && section.components) {
                section.components.forEach((component: any) => {
                    if (component._type === 'caseStudyRichText' && component.content) {
                        component.content.forEach((block: any) => {
                            if (block._type === 'block' && block.style === 'h2' && block.children) {
                                const text = block.children
                                    .filter((child: any) => child._type === 'span')
                                    .map((span: any) => span.text || '')
                                    .join('');
                                
                                if (text) {
                                    const id = text
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/^-|-$/g, '');
                                    extracted.push({ id, text });
                                }
                            }
                        });
                    }
                });
            }
        });

        return extracted;
    }, [project.content]);

    useEffect(() => {
        setHeadings(extractHeadings);
    }, [extractHeadings]);

    if (!project) {
        return null;
    }

    const hasCategories = project?.categories && project?.categories.length > 0;

    return (
        <main className="min-h-screen bg-off-black text-white">
            <section className="pt-24 md:pt-40">
                <div className="container">
                    <div className="flex flex-col gap-y-12 items-center text-center">
                        <div className="flex flex-col items-center text-center gap-y-8">
                            {project?.logo && (
                                <div className="max-w-[150px]">
                                    <SanityImage image={project?.logo} />
                                </div>
                            )}
                            <div className="flex flex-col gap-y-8 items-center text-center max-w-[856px] w-full mx-auto">
                                {project?.title && (
                                    <h1 className="text-100px uppercase leading-[0.94]" dangerouslySetInnerHTML={{ __html: project?.title }} />
                                )}
                                {hasCategories && (
                                    <div className="flex items-center flex-wrap gap-3">
                                        {project?.categories?.map((category, i) => {
                                            // Categories are dereferenced in the query (see queries.ts), so they have title
                                            // Type assertion needed because Project type defines them as references
                                            const dereferencedCategory = category as unknown as DereferencedCategory;
                                            return (
                                                <div key={`project-categories-${i}-${dereferencedCategory?._id || i}`} className="py-1 px-2 border border-white/25 text-sm uppercase font-medium rounded-sm">
                                                    {dereferencedCategory?.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        {project?.video ? (
                            <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                                <VideoPlayer
                                    video={project.video}
                                    poster={project.coverImage}
                                    videoType={project.videoType}
                                    buttonClassName="relative flex items-center justify-center rounded-lg overflow-hidden w-full h-full cursor-pointer group"
                                />
                            </div>
                        ) : project?.coverImage && (
                            <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                                <SanityImage
                                    image={project.coverImage}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="py-16 lg:py-36">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-[210px_auto] gap-16 md:gap-20 lg:gap-40 relative">
                        <aside className="relative">
                            {headings.length > 0 && (
                                <div className="sticky top-20">
                                    <TableOfContents headings={headings} />
                                </div>
                            )}
                        </aside>
                        <article className="max-w-768px">
                            {/* {project.date && (
                                <p className="text-sm opacity-60 mb-20">
                                    {new Date(project.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )} */}
                            {/* Content */}
                            {project.content && project.content.length > 0 && (
                                <div className="space-y-12 md:space-y-20">
                                    {project.content.map((section: any) => {
                                        if (section._type === 'caseStudyBuilder' && section.components) {
                                            return (
                                                <div key={section._key} className="space-y-8 md:space-y-20">
                                                    {section.components.map((component: any) => {
                                                        if (component._type === 'caseStudyRichText') {
                                                            return (
                                                                <CaseStudyRichText
                                                                    key={component._key}
                                                                    content={component.content}
                                                                />
                                                            );
                                                        }
                                                        if (component._type === 'caseStudyImage') {
                                                            return (
                                                                <CaseStudyImage
                                                                    key={component._key}
                                                                    type={component.type}
                                                                    image={component.image}
                                                                    video={component.video}
                                                                    videoPoster={component.videoPoster}
                                                                    videoOptions={component.videoOptions}
                                                                />
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}

