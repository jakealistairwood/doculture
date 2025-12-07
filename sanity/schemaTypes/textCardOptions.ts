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
            description: 'Controls the font size of paragraphs and lists inside the content rich text editor',
            options: {
                list: [
                    { value: 'default', title: 'Default' },
                    { value: 'md', title: 'Medium' },
                    { value: 'lg', title: 'Large' },
                ],
                layout: 'radio'
            },
            initialValue: 'default'
        }),
        defineField({
            name: 'contentMaxWidth',
            title: 'Content Max Width',
            type: 'number',
            description: 'Please enter a value here to set the max width of the content container (px)'
        }),
        defineField({
            name: 'listType',
            title: 'List Type',
            type: 'string',
            description: 'Allows you to control the list type when using content rich text editor',
            options: {
                list: [
                    { value: 'bullet', title: 'Bullet' },
                    { value: 'tick', title: 'Tick' }
                ],
                layout: 'radio'
            },
            initialValue: 'bullet'
        })
    ]
})