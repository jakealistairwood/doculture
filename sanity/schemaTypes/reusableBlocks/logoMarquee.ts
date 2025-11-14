import { ImagesIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const logoMarquee = defineType({
    name: 'logoMarquee',
    title: 'Logo Marquee',
    type: 'object',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Internal title for reference'
        }),
        defineField({
            name: 'logos',
            title: 'Logos',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                            description: 'Important for accessibility and SEO',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'link',
                            type: 'url',
                            title: 'Link (optional)',
                            description: 'URL to navigate to when logo is clicked'
                        }
                    ]
                }
            ],
            validation: Rule => Rule.min(1).required()
        }),
    ],
    preview: {
        select: {
            title: 'title',
            logos: 'logos'
        },
        prepare({ title, logos }) {
            return {
                title: title || 'Logo Marquee',
                subtitle: `${logos?.length || 0} logos`,
                media: ImagesIcon
            }
        }
    }
});