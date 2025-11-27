import { defineField, defineType } from "sanity";

export const selectedWorks = defineType({
    name: 'selectedWorks',
    title: 'Selected Works',
    type: 'object',
    fields: [
        defineField({
            name: 'caseStudies',
            type: 'array',
            of: [
                { 
                    type: 'reference', 
                    to: [{ type: 'project' }],
                },
            ],
        })
    ]
})