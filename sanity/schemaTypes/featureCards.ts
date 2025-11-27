import { defineField, defineType } from 'sanity'

export const featureCards = defineType({
    name: 'featureCards',
    title: 'Feature Cards',
    type: 'object',
    fields: [
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { value: 'twoCols', title: 'Two Columns' },
                    { value: 'threeCols', title: 'Three Columns' },
                    { value: 'fourCols', title: 'Four Columns' }
                ],
                layout: 'radio'
            },
            initialValue: 'threeCols'
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { value: 'numbered', title: 'Numbered' },
                ],
                layout: 'radio'
            },
            initialValue: 'numbered'
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                defineField({
                    name: 'feature',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            options: {
                                list: [
                                    { value: 'none', title: 'None' },
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'none'
                        }),
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string'
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text'
                        })
                    ]
                })
            ]
        })
    ]
})