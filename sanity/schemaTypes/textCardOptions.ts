import { defineField, defineType } from 'sanity'

export const textCardOptions = defineType({
    name: 'textCardOptions',
    title: 'Text Card Options',
    type: 'object',
    fields: [
        defineField({
            name: 'centerAlign',
            title: 'Center Align',
            type: 'boolean',
            initialValue: false,
            description: "If enabled, will position the text card so it's evenly centered on the page"
        }),
        defineField({
            name: 'centerAlignOnMobile',
            title: 'Center Align On Mobile',
            type: 'boolean',
            initialValue: false,
            description: "If enabled, will position the text card so it's evenly centered on the page on mobile devices"
        }),
        defineField({
            name: 'subheadingTag',
            title: 'Subheading Tag',
            type: 'string',
            options: {
                list: [
                    { value: 'h1', title: 'H1' },
                    { value: 'h2', title: 'H2' },
                    { value: 'h3', title: 'H3' },
                    { value: 'h4', title: 'H4' },
                    { value: 'h5', title: 'H5' },
                ],
                layout: 'radio'
            },
            initialValue: 'h2'
        }),
        defineField({
            name: 'headingTag',
            title: 'Heading Tag',
            type: 'string',
            options: {
                list: [
                    { value: 'h1', title: 'H1' },
                    { value: 'h2', title: 'H2' },
                    { value: 'h3', title: 'H3' },
                    { value: 'h4', title: 'H4' },
                    { value: 'h5', title: 'H5' }
                ],
                layout: 'radio'
            },
            initialValue: 'h2'
        }),
        defineField({
            name: 'headingFontSize',
            title: 'Heading Font Size',
            type: 'string',
            options: {
                list: [
                    { value: '24px', title: '24px' },
                    { value: '40px', title: '40px' },
                    { value: '80px', title: '80px' },
                    { value: '100px', title: '100px' },
                    { value: '120px', title: '120px' }
                ],
                layout: 'radio'
            },
            initialValue: '40px'
        }),
        defineField({
            name: 'headingMaxWidth',
            title: 'Heading Max Width',
            type: 'number',
            description: 'Please enter a value here to set the max width of the heading container (px)'
        }),
        defineField({
            name: 'contentFontSize',
            title: 'Content Font Size',
            type: 'string',
            options: {
                list: [
                    { value: '16px', title: '16px' },
                    { value: '18px', title: '18px' },
                    { value: '20px', title: '20px' },
                    { value: '24px', title: '24px' }
                ],
                layout: 'radio'
            },
            initialValue: '18px'
        }),
        defineField({
            name: 'contentMaxWidth',
            title: 'Content Max Width',
            type: 'number',
            description: 'Please enter a value here to set the max width of the content container (px)'
        })
    ]
})