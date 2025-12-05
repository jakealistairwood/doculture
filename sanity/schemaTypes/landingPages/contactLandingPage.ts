import { defineField, defineType } from "sanity";

export const contactLandingPage = defineType({
    name: 'contactLandingPage',
    title: 'Contact Landing Page',
    type: 'object',
    fields: [
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
            name: 'whyUs',
            title: 'Why Us',
            type: 'blockContent'
        }),
        defineField({
            name: 'image',
            title: 'Image',
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
        }),
        defineField({
            name: 'logoMarqueeBlock',
            title: 'Logo Marquee',
            type: 'reference',
            to: [{ type: 'reusableBlock' }],
            description: 'Select a logo marquee reusable block to display',
        }),
    ]
})