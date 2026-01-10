import { defineField, defineType } from "sanity"
import { ImageIcon } from '@sanity/icons'

export const caseStudyImageGallery = defineType({
    name: 'caseStudyImageGallery',
    title: 'Image Gallery / Marquee',
    type: 'object',
    icon: ImageIcon,
    fields: [
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
            images: 'images'
        },
        prepare({ images }) {
            const imageCount = images?.length || 0;
            return {
                title: 'Image Gallery / Marquee',
                subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`
            }
        }
    }
});

