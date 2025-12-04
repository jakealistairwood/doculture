import { defineField, defineType } from "sanity"
import { ImageIcon } from '@sanity/icons'

export const caseStudyImage = defineType({
    name: 'caseStudyImage',
    title: 'Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        })
    ],
    preview: {
        select: {
            image: 'image',
            alt: 'image.alt'
        },
        prepare({ image, alt }) {
            return {
                title: alt || 'Image',
                media: image
            }
        }
    }
});


