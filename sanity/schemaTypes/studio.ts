import { defineField, defineType } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

export const studio = defineType({
    name: 'studio',
    title: 'Studio',
    type: 'document',
    icon: PresentationIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image'
        }),
        defineField({
            name: 'features',
            title: 'Feature',
            type: 'array',
            of: [{ type: 'string' }]
        })
    ]
})