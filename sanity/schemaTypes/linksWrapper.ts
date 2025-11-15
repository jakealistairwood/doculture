import { defineType, defineField } from 'sanity'

export const linksWrapper = defineType({
    name: 'linksWrapper',
    title: 'Links Wrapper',
    type: 'array',
    of: [
        defineField({
            name: 'link',
            type: 'link'
        })
    ],
    validation: (Rule) => Rule.max(2).error('You can only add up to 2 links')
})