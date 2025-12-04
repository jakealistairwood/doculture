import { defineField, defineType } from 'sanity'

export const globalCTA = defineType({
    name: 'globalCTA',
    title: 'Global CTA',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'altText',
                    title: 'Alt Text',
                    type: 'string'
                }
            ],
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        }),
        defineField({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
                {
                    name: 'url',
                    title: 'URL',
                    type: 'string'
                },
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string'
                }
            ]
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare({ title }) {
            return {
                title: title || 'Global CTA',
            }
        }
    }
})