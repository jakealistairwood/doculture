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
            name: 'aspectRatio',
            title: 'Aspect Ratio',
            type: 'string',
            description: "Decide the aspect ratio for the images in the grid",
            options: {
                list: [
                    { value: '16/9', title: '16/9' },
                    { value: '1/1', title: '1/1' },
                    { value: '4/5', title: '4/5' },
                    { value: '9/16', title: '9/16' },
                ],
                layout: 'radio'
            },
            initialValue: '4/5'
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

