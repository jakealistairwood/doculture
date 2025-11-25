import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Portfolio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'Provide a brief overview of the project/case study'
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date'
        })
    ]
})