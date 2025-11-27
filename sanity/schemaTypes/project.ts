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
            title: 'Content',
            type: 'array',
            description: 'Build your project content by adding assets and rich text blocks',
            of: [
                {
                    type: 'fullWidthAsset',
                    title: 'Asset',
                },
                defineArrayMember({
                    type: 'block',
                    title: 'Rich Text',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'H1', value: 'h1'},
                        {title: 'H2', value: 'h2'},
                        {title: 'H3', value: 'h3'},
                        {title: 'H4', value: 'h4'},
                        {title: 'Quote', value: 'blockquote'},
                    ],
                    lists: [{title: 'Bullet', value: 'bullet'}],
                    marks: {
                        decorators: [
                            {title: 'Strong', value: 'strong'},
                            {title: 'Emphasis', value: 'em'},
                        ],
                        annotations: [
                            {
                                title: 'URL',
                                name: 'link',
                                type: 'object',
                                fields: [
                                    {
                                        title: 'URL',
                                        name: 'href',
                                        type: 'url',
                                    },
                                ],
                            },
                        ],
                    },
                }),
                defineArrayMember({
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                        }
                    ]
                }),
            ],
        })
    ]
})