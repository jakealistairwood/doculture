import { defineType, defineField } from "sanity";

export const aboutMasthead = defineType({
    name: 'aboutMasthead',
    title: 'About Masthead',
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
            name: 'leftTopImage',
            title: 'Left Top Image',
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
        defineField({
            name: 'leftBottomImage',
            title: 'Left Bottom Image',
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
        defineField({
            name: 'rightTopImage',
            title: 'Right Top Image',
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
        defineField({
            name: 'rightBottomImage',
            title: 'Right Bottom Image',
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