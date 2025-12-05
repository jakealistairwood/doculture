import { defineField, defineType } from 'sanity'

export const timedAccordionSlider = defineType({
    name: 'timedAccordionSlider',
    title: 'Timed Accordion Slider',
    type: 'object',
    fields: [
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
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
                        })
                    ]
                }
            ]
        })
    ]
})