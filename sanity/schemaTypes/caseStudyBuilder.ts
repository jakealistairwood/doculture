import { defineField, defineType } from "sanity"

export const caseStudyBuilder = defineType({
    name: 'caseStudyBuilder',
    title: 'Case Study Builder',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Section Title',
            description: 'Optional title for this section (for organization purposes)'
        }),
        defineField({
            name: 'components',
            title: 'Components',
            type: 'array',
            of: [
                { type: 'caseStudyRichText' },
                { type: 'caseStudyImage' },
                { type: 'caseStudyImageGrid' },
                { type: 'caseStudyImageGallery' },
            ]
        }),
    ]
});

