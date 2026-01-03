import { defineType, defineField } from "sanity";

export const twoColMasthead = defineType({
    name: 'twoColMasthead',
    title: 'Two Column Masthead',
    type: 'object',
    fields: [
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text'
        }),
        defineField({
            name: 'links',
            type: 'linksWrapper'
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
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
        })
    ],
    preview: {
        select: {
            title: 'heading',
        },
    }
})