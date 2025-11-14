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
            name: 'logoMarquee',
            title: 'Logo Marquee',
            type: 'logoMarquee',
        })
    ],
    preview: {
        select: {
            title: 'title',
            logoCount: 'logoMarquee.logos'
        },
        prepare({ title, logoCount }) {
            return {
                title: title,
                subtitle: `Logo Marquee (${logoCount?.length || 0} logos)`
            }
        }
    }
});