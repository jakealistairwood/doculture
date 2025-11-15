import { defineType, defineField } from 'sanity';

export const sectionOptions = defineType({
    name: 'sectionOptions',
    title: 'Section Options',
    type: 'object',
    fields: [
        defineField({
            name: 'bgColor',
            title: 'Background Color',
            type: 'string',
            options: {
                list: [
                    { value: 'none', title: 'None' },
                    { value: 'black', title: 'Black' },
                    { value: 'white', title: 'White' },
                ],
                layout: 'radio'
            },
            initialValue: 'none'
        }),
        defineField({
            name: 'removeContainer',
            title: 'Remove Container',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'paddingTop',
            title: 'Padding Top',
            type: 'string',
            options: {
                list: [
                    { value: 'none', title: 'None' },
                    { value: 'sm', title: 'Small' },
                    { value: 'md', title: 'Medium' },
                    { value: 'lg', title: 'Large' }
                ],
                layout: 'radio'
            },
            initialValue: 'none'
        }),
        defineField({
            name: 'paddingBottom',
            title: 'Padding Bottom',
            type: 'string',
            options: {
                list: [
                    { value: 'none', title: 'None' },
                    { value: 'sm', title: 'Small' },
                    { value: 'md', title: 'Medium' },
                    { value: 'lg', title: 'Large' }
                ],
                layout: 'radio'
            },
            initialValue: 'none'
        }),
        defineField({
            name: 'marginTop',
            title: 'Margin Top',
            type: 'string',
            options: {
                list: [
                    { value: 'none', title: 'None' },
                    { value: 'sm', title: 'Small' },
                    { value: 'md', title: 'Medium' },
                    { value: 'lg', title: 'Large' }
                ],
                layout: 'radio'
            },
            initialValue: 'none'
        }),
        defineField({
            name: 'marginBottom',
            title: 'Margin Bottom',
            type: 'string',
            options: {
                list: [
                    { value: 'none', title: 'None' },
                    { value: 'sm', title: 'Small' },
                    { value: 'md', title: 'Medium' },
                    { value: 'lg', title: 'Large' }
                ],
                layout: 'radio'
            },
            initialValue: 'none'
        }),
    ]
})