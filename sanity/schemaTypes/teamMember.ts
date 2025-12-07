import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string'
        }),
        defineField({
            name: 'headshot',
            title: 'Headshot',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent'
        })
    ]
})