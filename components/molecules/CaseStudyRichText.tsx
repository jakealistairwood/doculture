"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { BlockContent } from "@/sanity/types";
import SanityImage from "@/components/atoms/SanityImage";

interface CaseStudyRichTextProps {
    content: BlockContent;
}

// Extract types from BlockContent
type BlockContentImage = Extract<BlockContent[number], { _type: "image" }>;
type BlockContentBlock = Extract<BlockContent[number], { _type: "block" }>;
type BlockContentSpan = NonNullable<BlockContentBlock["children"]>[number];
type BlockContentLink = NonNullable<BlockContentBlock["markDefs"]>[number] & { _type: "link" };

// Custom components for PortableText
const components = {
    types: {
        image: ({ value }: { value: BlockContentImage }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className="my-8">
                    <SanityImage
                        image={value}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            );
        },
    },
    block: {
        h1: ({ children }: { children?: React.ReactNode }) => (
            <h1 className="text-4xl md:text-5xl font-heading uppercase mt-12 mb-6 first:mt-0">
                {children}
            </h1>
        ),
        h2: ({ children, value }: { children?: React.ReactNode; value?: BlockContentBlock }) => {
            // Generate ID from text content
            let text = '';
            if (value?.children) {
                text = value.children
                    .filter((child: BlockContentSpan): child is BlockContentSpan => child._type === 'span')
                    .map((span) => span.text || '')
                    .join('');
            } else if (typeof children === 'string') {
                text = children;
            } else if (Array.isArray(children)) {
                text = children.map(c => typeof c === 'string' ? c : '').join('');
            }
            
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            return (
                <h2 
                    id={id}
                    className="text-3xl md:text-4xl font-heading uppercase mt-12 mb-6 first:mt-0 scroll-mt-20"
                >
                    {children}
                </h2>
            );
        },
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-2xl font-medium mt-10 mb-4">
                {children}
            </h3>
        ),
        h4: ({ children }: { children?: React.ReactNode }) => (
            <h4 className="text-xl md:text-2xl font-heading uppercase mt-8 mb-4">
                {children}
            </h4>
        ),
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-base md:text-lg leading-relaxed mb-6">
                {children}
            </p>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-4 border-current pl-6 py-4 my-8 italic text-lg">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
            <em className="italic">{children}</em>
        ),
        link: ({ value, children }: { value?: BlockContentLink; children?: React.ReactNode }) => {
            const href = value?.href;
            const target = href?.startsWith('http') ? '_blank' : undefined;
            const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
            return (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    className="link-group text-inherit hover:text-inherit/80 transition-colors"
                >
                    <span data-underline-link="alt">{children}</span>
                </a>
            );
        },
    },
    list: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                {children}
            </ul>
        ),
        number: ({ children }: { children?: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-6 space-y-2 ml-4">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <li className="text-base md:text-lg leading-relaxed">{children}</li>
        ),
        number: ({ children }: { children?: React.ReactNode }) => (
            <li className="text-base md:text-lg leading-relaxed">{children}</li>
        ),
    },
} as PortableTextComponents;

export default function CaseStudyRichText({ content }: CaseStudyRichTextProps) {
    if (!content || content.length === 0) {
        return null;
    }

    return (
        <div className="prose prose-lg max-w-none">
            <PortableText value={content} components={components} />
        </div>
    );
}

