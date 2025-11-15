import { defineType, defineField } from 'sanity'

export const link = defineField({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { value: 'button', title: 'Button' },
                    { value: 'textLink', title: 'Text Link' }
                ],
                layout: 'radio'
            },
            initialValue: 'button'
        }),
        defineField({
            name: 'buttonSize',
            title: 'Button Size',
            type: 'string',
            options: {
                list: [
                    { value: 'default', title: 'Default' },
                    { value: 'sm', title: 'Small' },
                    { value: 'lg', title: 'Large' }
                ],
                layout: 'radio'
            },
            initialValue: 'default'
        }),
        defineField({
            name: 'buttonStyle',
            title: 'Button Style',
            type: 'string',
            options: {
                list: [
                    { value: 'primary', title: 'Primary' },
                    { value: 'outline', title: 'Outline' },
                ],
                layout: 'radio'
            },
            initialValue: 'primary',
            hidden: ({parent}) => parent?.type !== "button"
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'string'
        }),
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string'
        })
    ]
})