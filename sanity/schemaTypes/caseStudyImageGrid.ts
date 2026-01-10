import { defineField, defineType } from "sanity"
import { ImageIcon } from '@sanity/icons'

export const caseStudyImageGrid = defineType({
    name: 'caseStudyImageGrid',
    title: 'Image Grid',
    type: 'object',
    icon: ImageIcon,
    fields: [
        defineField({
            name: 'columns',
            title: 'Columns',
            type: 'string',
            options: {
                list: [
                    { value: '2', title: '2 Columns' },
                    { value: '3', title: '3 Columns' },
                    { value: '4', title: '4 Columns' }
                ],
                layout: 'radio'
            },
            initialValue: '2'
        }),
        defineField({
            name: 'images',
            type: 'array',
            title: 'Images',
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
            ],
            validation: (Rule) => Rule.min(1).error('At least one image is required')
        }),
    ],
    preview: {
        select: {
            columns: 'columns',
            images: 'images'
        },
        prepare({ columns, images }) {
            const imageCount = images?.length || 0;
            return {
                title: `Image Grid (${columns || 2} columns)`,
                subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`
            }
        }
    }
});

