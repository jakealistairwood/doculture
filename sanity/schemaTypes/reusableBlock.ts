import {defineField, defineType} from 'sanity'
import { BlockElementIcon } from '@sanity/icons';

export const reusableBlock = defineType({
    name: 'reusableBlock',
    title: 'Reusable Block',
    type: 'document',
    icon: BlockElementIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Block Title',
            type: 'string',
            description: 'Internal name for this reusable block',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { value: 'logoMarquee', title: 'Logo Marquee' },
                    { value: 'globalCTA', title: 'Global CTA' }
                ],
                layout: 'radio'
            },
            initialValue: 'logoMarquee'
        }),
        defineField({
            name: 'logoMarquee',
            title: 'Logo Marquee',
            type: 'logoMarquee',
            hidden: ({parent}) => parent?.type !== 'logoMarquee'
        }),
        defineField({
            name: 'globalCTA',
            title: 'Global CTA',
            type: 'globalCTA',
            hidden: ({parent}) => parent?.type !== 'globalCTA'
        })
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title,
            }
        }
    }
});