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
    ]
})