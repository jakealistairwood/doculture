import { defineType, defineField } from 'sanity';

export const sectionOptions = defineType({
    name: 'sectionOptions',
    title: 'Section Options',
    type: 'object',
    fields: [
        defineField({
            name: 'id',
            title: 'ID',
            type: 'string'
        }),
        defineField({
            name: 'bgColor',
            title: 'Background Color',
            type: 'string',
            options: {
                list: [
                    { value: 'none', title: 'None' },
                    { value: 'black', title: 'Black' },
                    { value: 'white', title: 'White' },
                    { value: 'lightGrey', title: 'Light Grey' }
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
        defineField({
            name: 'componentSpacing',
            title: 'Component Spacing',
            type: 'string',
            options: {
                list: [
                    { value: 'default', title: 'Default' },
                    { value: 'sm', title: 'Small' },
                    { value: 'md', title: 'Medium' },
                    { value: 'lg', title: 'Large' }
                ],
                layout: 'radio'
            },
            initialValue: 'default',
            description: 'Controls the space between each component in a section'
        }),
        defineField({
            name: 'overflow',
            title: 'Overflow',
            type: 'string',
            options: {
                list: [
                    { value: 'hidden', title: 'Hidden' },
                    { value: 'visible', title: 'Visible' }
                ],
                layout: 'radio'
            },
            initialValue: 'hidden'
        }),
        defineField({
            name: 'addBottomDivider',
            title: 'Add Bottom Divider',
            type: 'boolean',
            initialValue: false,
            description: "Adds a thin border to the bottom of the section"
        })
    ]
})