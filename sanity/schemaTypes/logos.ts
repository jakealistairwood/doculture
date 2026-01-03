import { defineType, defineField } from 'sanity'

export const logos = defineType({
    name: 'logos',
    title: 'Logos',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            title: 'Layout',
            type: 'string',
            description: 'Choose how the logos will be displayed',
            options: {
                list: [
                    { value: 'marquee', title: 'Marquee' },
                    { value: 'grid', title: 'Grid' }
                ],
                layout: 'radio'
            },
            initialValue: 'marquee',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'Optional heading or caption that appears with the logos'
        }),
        defineField({
            name: 'labelPlacement',
            title: 'Label Placement',
            type: 'string',
            options: {
                list: [
                    { value: 'stacked', title: 'Stacked (label above marquee)' },
                    { value: 'side', title: 'Side by side' }
                ],
                layout: 'radio'
            },
            initialValue: 'side',
            hidden: ({ parent }) => parent?.type !== 'marquee'
        }),
        defineField({
            name: 'logoMarqueeBlock',
            title: 'Reusable Logo Marquee',
            type: 'reference',
            description: 'Select the reusable logo marquee whose logos should appear in this section',
            to: [{ type: 'reusableBlock' }],
            options: {
                filter: 'defined(logoMarquee.logos)'
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'invertLogos',
            title: 'Invert Logos',
            type: 'boolean',
            initialValue: false
        })
    ],
    preview: {
        select: {
            title: 'label',
            type: 'type'
        },
        prepare({ title, type }) {
            return {
                title: title || 'Logos',
                subtitle: type === 'grid' ? 'Grid layout' : 'Marquee layout'
            }
        }
    }
});