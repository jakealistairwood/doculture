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
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'string'
                }),
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
                    name: 'links',
                    type: 'linksWrapper'
                }),
                defineField({
                    name: 'leftTopImage',
                    title: 'Left Top Image',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'altText',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                        }
                    ]
                }),
                defineField({
                    name: 'leftBottomImage',
                    title: 'Left Bottom Image',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'altText',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                        }
                    ]
                }),
                defineField({
                    name: 'rightTopImage',
                    title: 'Right Top Image',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'altText',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                        }
                    ]
                }),
                defineField({
                    name: 'rightBottomImage',
                    title: 'Right Bottom Image',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'altText',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                        }
                    ]
                }),
            ]
        }),
        defineField({
            name: 'ourMission',
            title: 'Our Mission',
            type: 'object',
            fields: [
                defineField({
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'string'
                }),
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string'
                }),
                defineField({
                    name: 'images',
                    title: 'Images',
                    type: 'array',
                    of: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true
                            },
                            fields: [
                                {
                                    name: 'altText',
                                    title: 'Alt Text',
                                    type: 'string',
                                    description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                                }
                            ]
                        }
                    ]
                })
            ]
        }),
        defineField({
            name: 'whyWeExist',
            title: 'Why We Exist',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string'
                }),
                defineField({
                    name: 'content',
                    title: 'Content',
                    type: 'blockContent'
                }),
            ]
        }),
        defineField({
            name: 'ourJourney',
            title: 'Our Journey',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string'
                }),
                defineField({
                    name: 'content',
                    title: 'Content',
                    type: 'blockContent'
                }),
                defineField({
                    name: 'links',
                    type: 'linksWrapper'
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'altText',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                        }
                    ]
                })
            ]
        }),
        defineField({
            name: 'ourValues',
            title: 'Our Values',
            type: 'object',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string'
                }),
                defineField({
                    name: 'values',
                    title: 'Values',
                    type: 'array',
                    of: [
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'icon',
                                    title: 'Icon',
                                    type: 'image',
                                    options: {
                                        hotspot: true
                                    },
                                    fields: [
                                        {
                                            name: 'altText',
                                            title: 'Alt Text',
                                            type: 'string',
                                            description: 'Please add a brief description of the image. Important for SEO purposes and accessibility'
                                        }
                                    ]
                                }),
                                defineField({
                                    name: 'heading',
                                    title: 'Heading',
                                    type: 'string'
                                }),
                                defineField({
                                    name: 'description',
                                    title: 'Description',
                                    type: 'text'
                                })
                            ]
                        })
                    ]
                })
            ]
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