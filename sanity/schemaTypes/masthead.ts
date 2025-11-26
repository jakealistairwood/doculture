import { defineType, defineField } from "sanity";

export const masthead = defineType({
    name: 'masthead',
    title: 'Masthead',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { value: 'home', title: 'Home' },
                    { value: 'services', title: 'Services' },
                    { value: 'about', title: 'About' }
                ],
                layout: 'radio'
            },
            initialValue: 'home'
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
    ],
    preview: {
        select: {
            title: 'heading',
        },
    }
})