import { defineType, defineField } from 'sanity'

export const imageGrid = defineType({
    name: 'imageGrid',
    title: 'Image Grid',
    type: 'object',
    fields: [
        defineField({
            name: 'images',
            type: 'array',
            of: [
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
                            type: 'string',
                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                        }
                    ]
                })
            ]
        }),
        defineField({
            name: 'aspectRatio',
            title: 'Aspect Ratio',
            type: 'string',
            options: {
                list: [
                    { value: 'square', title: 'Square (1:1)' },
                    { value: 'landscape', title: 'Landscape (4:3)' },
                    { value: 'portrait', title: 'Portrait (3:4)' },
                    { value: 'wide', title: 'Wide (16:9)' },
                    { value: 'auto', title: 'Auto (Original)' }
                ],
                layout: 'radio'
            },
            initialValue: 'square',
            description: 'Choose the aspect ratio for the grid images'
        })
    ]
})