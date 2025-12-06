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
        })
    ]
})