import { defineField, defineType } from "sanity"

export const section = defineType({
    name: 'section',
    title: 'Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'components',
            title: 'Components',
            type: 'array',
            of: [
                { type: 'homeMasthead' },
                { type: 'textCard' }
            ]
        }),
        defineField({
            name: 'sectionOptions',
            type: 'sectionOptions'
        })
    ]
});