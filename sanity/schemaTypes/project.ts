import { defineField, defineType, defineArrayMember } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Case Studies',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'formattedTitle',
            title: 'Formatted Title',
            type: 'string',
            description: 'If you want a specific part of the title to break onto a new line use this field and add "<br>" before the word you want to create a new line.'
        }),
        defineField({
            name: 'sortOrder',
            title: 'Sort Order',
            type: 'number',
            description: 'This determines the order in which the project will appear within the list of works directory. If left empty, will be added to the end.',
            validation: (Rule) => Rule.min(1).error('Sort order must be at least 1')
        }),
        defineField({
            name: 'logo',
            type: 'image',
            title: 'Logo'
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'Provide a brief overview of the project/case study'
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                { 
                    type: 'reference', 
                    to: [{ type: 'category' }],
                },
            ],
            description: 'Select multiple categories for this project'
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date'
        }),
        defineField({
            name: 'coverImage',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ],
            description: 'This image will be used as the video poster if a video is provided'
        }),
        defineField({
            name: 'video',
            title: 'Hero Video',
            type: 'string',
            description: 'Video URL to display in the hero section (replaces cover image when provided). The cover image will be used as the video poster.'
        }),
        defineField({
            name: 'videoType',
            title: 'Video Type',
            type: 'string',
            options: {
                list: [
                    { value: 'normal', title: 'Normal' },
                    { value: 'short', title: 'Short' }
                ],
                layout: 'radio'
            },
            initialValue: 'normal'
        }),
        defineField({
            name: 'content',
            title: 'Case Study Content',
            type: 'array',
            of: [{ type: 'caseStudyBuilder' }]
        }),
    ]
})