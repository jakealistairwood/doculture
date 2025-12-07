import { defineType, defineField } from 'sanity'

export const twoColTextAsset = defineType({
    name: 'twoColTextAsset',
    title: 'Two Col Text Asset',
    type: 'object',
    fields: [
        defineField({
            name: 'textCard',
            title: 'Text Card',
            type: 'textCard'
        }),
        defineField({
            name: 'asset',
            title: 'Asset',
            type: 'asset'
        }),
        defineField({
            name: 'alignTextVertically',
            title: 'Align Text Vertically',
            type: 'boolean',
            description: 'If enabled, the text card will be vertically centered relative to the asset. If disabled, the text will align to the top.',
            initialValue: false,
        }),
        defineField({
            name: 'reverseDirection',
            title: 'Reverse Direction',
            type: 'boolean',
            description: 'Changes the direction on desktop, so the text and asset will be reversed',
            initialValue: false
        })
    ]
})