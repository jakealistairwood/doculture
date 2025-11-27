import { defineField, defineType } from "sanity";

export const studioCarousel = defineType({
    name: 'studioCarousel',
    title: 'Studio Carousel',
    type: 'object',
    fields: [
        defineField({
            name: 'studios',
            type: 'array',
            of: [
                { 
                    type: 'reference', 
                    to: [{ type: 'studio' }],
                },
            ],
        })
    ]
})

