"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Project } from "@/sanity/types";
import Link from "next/link";
import SanityImage from "@/components/atoms/SanityImage";

interface OurWorkProps {
    projects: Project[];
}

interface Category {
    _id: string;
    title?: string;
    slug?: {
        current?: string;
    };
}

const arrowAnimation = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        scale: [0, 1.2, 1],
        opacity: 1,
    }
}

const fadeInProject = {
        initial: {
            opacity: 0,
            y: 100,
            filter: "blur(20px)",
        },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                delay: i % 2 !== 0 ? 0.1 : 0,
                duration: 0.3,
                ease: "easeOut",
            },
        })
    }

export default function OurWorks({ projects }: OurWorkProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Extract all unique categories from projects
    const allCategories = useMemo(() => {
        const categoryMap = new Map<string, Category>();
        
        projects.forEach((project) => {
            if (project.categories) {
                project.categories.forEach((category: any) => {
                    if (category?._id && !categoryMap.has(category._id)) {
                        categoryMap.set(category._id, {
                            _id: category._id,
                            title: category.title,
                            slug: category.slug,
                        });
                    }
                });
            }
        });
        
        return Array.from(categoryMap.values());
    }, [projects]);

    // Filter projects based on selected category
    const filteredProjects = useMemo(() => {
        if (!selectedCategory) {
            return projects;
        }
        
        return projects.filter((project) => {
            if (!project.categories || project.categories.length === 0) {
                return false;
            }
            return project.categories.some((category: any) => category?._id === selectedCategory);
        });
    }, [projects, selectedCategory]);

    if (!projects || projects.length === 0) {
        return (
            <main className="min-h-screen bg-off-black text-white">
                <section className="pt-40 pb-36">
                    <div className="container">
                        <div className="text-center">
                            <h1 className="text-120px uppercase leading-[0.94] mb-8">
                                Our Work
                            </h1>
                            <p className="text-lg opacity-60">
                                No case studies available yet.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-off-black text-white">
            <section className="pt-40 pb-36">
                <div className="container">
                    <div className="flex flex-col gap-y-16">
                        <div className="flex flex-col gap-y-8">
                            <div className="">
                                <h1
                                    className="text-120px uppercase leading-[0.94]"
                                    dangerouslySetInnerHTML={{
                                        __html: "Our Works",
                                    }}
                                />
                            </div>

                            {/* Filter Tags */}
                            {allCategories.length > 0 && (
                                <div className="flex items-center flex-wrap gap-3">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`py-1 px-2 border text-xs uppercase font-medium rounded-sm transition-colors ${
                                            selectedCategory === null
                                                ? "border-accent-orange text-accent-orange bg-accent-orange/10"
                                                : "border-white/[25%] hover:border-white/50"
                                        }`}
                                    >
                                        All
                                    </button>
                                    {allCategories.map((category) => (
                                        <button
                                            key={category._id}
                                            onClick={() => setSelectedCategory(category._id)}
                                            className={`py-1 px-2 border text-xs uppercase font-medium rounded-sm transition-colors ${
                                                selectedCategory === category._id
                                                    ? "border-accent-orange text-accent-orange bg-accent-orange/10"
                                                    : "border-white/[25%] hover:border-white/50"
                                            }`}
                                        >
                                            {category.title || "Untitled"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-lg opacity-60">
                                    No case studies found for this category.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {filteredProjects.map((project, i) => {
                                    const slug = project.slug?.current;
                                    if (!slug) return null;

                                    return (
                                        <ProjectPreviewCard key={project._id} project={project} slug={slug} index={i} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}


interface ProjectPreviewCardProps {
    project: Project;
    slug: string;
    index: number;
}

const ProjectPreviewCard = ({ project, slug, index }: ProjectPreviewCardProps) => {
    const [hovered, setHovered] = useState(false);
    const projectRef = useRef(null);

    const isInView = useInView(projectRef, {
        amount: 0.2,
        once: true,
    });
    return (
        <motion.div
            key={project._id}
            className="relative flex flex-col gap-y-11 group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            variants={fadeInProject}
            initial="initial" 
            animate={isInView ? "animate" : "initial"} 
            custom={index} 
            ref={projectRef}
        >
            {project.coverImage && (
                <div className="relative aspect-[711/400] overflow-hidden">
                    <SanityImage
                        image={project.coverImage}
                        className="w-full h-full object-cover"
                    />
                    <motion.div 
                        className="origin-center will-change-transform absolute top-6 right-6 w-[36px] h-[36px] bg-accent-orange text-off-black flex items-center justify-center rounded-full" 
                        variants={arrowAnimation} 
                        initial="initial" 
                        animate={hovered ? "animate" : "initial"}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5855 9.39779L10.523 14.4603C10.4174 14.5658 10.2743 14.6251 10.125 14.6251C9.97573 14.6251 9.83258 14.5658 9.72703 14.4603C9.62148 14.3547 9.56219 14.2116 9.56219 14.0623C9.56219 13.9131 9.62148 13.7699 9.72703 13.6644L13.8298 9.56232H2.8125C2.66332 9.56232 2.52024 9.50306 2.41475 9.39757C2.30926 9.29208 2.25 9.14901 2.25 8.99982C2.25 8.85064 2.30926 8.70757 2.41475 8.60208C2.52024 8.49659 2.66332 8.43732 2.8125 8.43732H13.8298L9.72703 4.33529C9.62148 4.22975 9.56219 4.08659 9.56219 3.93732C9.56219 3.78806 9.62148 3.6449 9.72703 3.53936C9.83258 3.43381 9.97573 3.37451 10.125 3.37451C10.2743 3.37451 10.4174 3.43381 10.523 3.53936L15.5855 8.60186C15.6378 8.6541 15.6793 8.71613 15.7076 8.78442C15.7359 8.85271 15.7504 8.9259 15.7504 8.99982C15.7504 9.07375 15.7359 9.14694 15.7076 9.21523C15.6793 9.28351 15.6378 9.34555 15.5855 9.39779Z" fill="currentColor"/>
                        </svg>
                    </motion.div>
                </div>
            )}
            <div className="flex flex-col gap-y-6 mt-auto">
                {project?.title && (
                    <Link
                        href={`/our-work/${slug}`}
                        className="accessible-link"
                    >
                        <h2 className="font-heading uppercase text-40px max-w-[350px] !leading-[0.94]">
                            {project.title}
                        </h2>
                    </Link>
                )}
                {project?.categories &&
                    project?.categories.length >
                        0 && (
                        <div className="flex items-center flex-wrap gap-3">
                            {project?.categories.map(
                                (category: any, i: number) => (
                                    <div 
                                        key={category?._id || i}
                                        className="py-1 px-2 border border-white/[25%] text-xs uppercase font-medium rounded-sm"
                                    >
                                        {
                                            category?.title
                                        }
                                    </div>
                                )
                            )}
                        </div>
                    )}
            </div>
        </motion.div>
    )
}