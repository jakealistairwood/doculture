import { defineType, defineField } from "sanity";

export const homeMasthead = defineType({
    name: 'homeMasthead',
    title: 'Home Masthead',
    type: 'object',
    fields: [
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
            name: 'backgroundVisualType',
            title: 'Background Visual Type',
            type: 'string',
            options: {
                list: [
                    { value: 'image', title: 'Image' },
                    { value: 'video', title: 'Video' },
                ],
                layout: 'radio'
            },
            initialValue: 'image'
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
            ],
            hidden: ({parent}) => parent?.backgroundVisualType !== "image"
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        // prepare({ title }) {
        //     return {
        //         title: title || 'Home Masthead',
        //         subtitle: 'Masthead component',
        //         media: () => (
        //             <img 
        //                 src="/images/home-masthead.png" 
        //                 alt="Home Masthead Preview"
        //                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        //             />
        //         )
        //     }
        // }
    }
})