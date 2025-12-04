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
            ]
        }),
        defineField({
            name: 'content',
            title: 'Case Study Content',
            type: 'array',
            of: [{ type: 'caseStudyBuilder' }]
        }),
    ]
})