import { defineField, defineType } from 'sanity'

export const linkCards = defineType({
    name: 'linkCards',
    title: 'Link Cards',
    type: 'object',
    fields: [
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { value: 'twoCols', title: 'Two Columns' },
                    { value: 'threeCols', title: 'Three Columns' },
                    { value: 'fourCols', title: 'Four Columns' }
                ],
                layout: 'radio'
            },
            initialValue: 'threeCols'
        }),
        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                defineField({
                    name: 'link',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'string'
                        }),
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true
                            },
                            fields: [
                                {
                                    name: 'altText',
                                    title: 'Alt Text',
                                    type: 'string',
                                    description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                                }
                            ]
                        }),
                    ]
                })
            ]
        })
    ]
})