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
                { type: 'masthead' },
                { type: 'homeMasthead' },
                { type: 'textCard' },
                { type: 'fullWidthAsset' },
                { type: 'logos' }
            ]
        }),
        defineField({
            name: 'sectionOptions',
            type: 'sectionOptions'
        })
    ]
});