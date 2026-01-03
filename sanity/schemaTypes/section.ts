import { defineField, defineType } from "sanity"

export const section = defineType({
    name: 'section',
    title: 'Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'components',
            title: 'Components',
            type: 'array',
            of: [
                { type: 'masthead' },
                { type: 'homeMasthead' },
                { type: 'twoColMasthead' },
                { type: 'textCard' },
                { type: 'asset' },
                { type: 'twoColTextAsset' },
                { type: 'logos' },
                { type: 'linkCards' },
                { type: 'headerMarquee' },
                { type: 'selectedWorks' },
                { type: 'featureCards' },
                { type: 'studioCarousel' },
                { type: 'timedAccordionSlider' },
                { type: 'imageGrid' },
                { type: 'twoColTextList' }
            ]
        }),
        defineField({
            name: 'sectionOptions',
            type: 'sectionOptions'
        })
    ]
});