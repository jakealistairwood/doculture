import { defineType, defineField } from 'sanity'

export const twoColTextList = defineType({
    name: 'twoColTextList',
    title: 'Two Col Text List',
    type: 'object',
    fields: [
        defineField({
            name: 'textCard',
            title: 'Text Card',
            type: 'textCard'
        }),
        defineField({
            name: 'listItems',
            title: 'List Items',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'alignTextVertically',
            title: 'Align Text Vertically',
            type: 'boolean',
            description: 'If enabled, the text card will be vertically centered relative to the asset. If disabled, the text will align to the top.',
            initialValue: false,
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
                    { value: 'lightGrey', title: 'Light Grey' },
                    { value: 'darkGrey', title: 'Dark Grey' },
                    { value: 'offBlack', title: 'Off Black' },
                ],
                layout: 'radio'
            },
            initialValue: 'none'
        }),
    ]
})