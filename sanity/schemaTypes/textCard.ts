import { defineType, defineField } from "sanity";

export const textCard = defineType({
    name: 'textCard',
    title: 'Text Card',
    type: 'object',
    fields: [
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'string'
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string'
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent'
        }),
        defineField({
            name: 'links',
            type: 'linksWrapper'
        }),
        defineField({
            name: 'textCardOptions',
            type: 'textCardOptions'
        })
    ]
})