import { defineField, defineType } from 'sanity'

export const aboutLandingPage = defineType({
    name: 'aboutLandingPage',
    title: 'About Landing Page',
    type: 'object',
    fields: [
        defineField({
            name: 'masthead',
            title: 'Masthead',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string'
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text'
                }),
                defineField({
                    name: 'asset',
                    title: 'Asset',
                    type: 'asset',
                }),
                defineField({
                    name: 'mastheadMaxWidth',
                    title: 'Masthead Max Width',
                    type: 'number',
                    description: 'Please enter a value here to set the max width of the masthead container (px)'
                })
            ]
        }),
        defineField({
            name: 'aboutUsContent',
            title: 'About Us Content',
            type: 'array',
            of: [{ type: 'caseStudyBuilder' }]
        }),
        defineField({
            name: 'meetTheTeam',
            title: 'Meet The Team',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string'
                }),
                defineField({
                    name: 'teamMembers',
                    type: 'array',
                    of: [
                        { 
                            type: 'reference', 
                            to: [{ type: 'teamMember' }],
                        },
                    ],
                })
            ]
        })
    ]
})