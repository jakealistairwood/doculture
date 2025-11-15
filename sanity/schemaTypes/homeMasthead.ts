import { defineType, defineField } from "sanity";

export const homeMasthead = defineType({
    name: 'homeMasthead',
    title: 'Home Masthead',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text'
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
        }),
        defineField({
            name: 'addLogoMarquee',
            title: 'Add Logo Marquee',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'logoMarquee',
            title: 'Logo Marquee',
            type: 'reference',
            to: [{ type: 'reusableBlock' }],
            description: 'Select a logo marquee to display',
            hidden: ({ parent }) => !parent?.addLogoMarquee,
            validation: Rule => Rule.custom((value, context) => {
                const parent = context.parent as { addLogoMarquee?: boolean };
                if (parent?.addLogoMarquee && !value) {
                    return 'Logo marquee is required when enabled';
                }
                return true;
            })
        })
    ],
    preview: {
        select: {
            title: 'heading',
        },
        // prepare({ title }) {
        //     return {
        //         title: title || 'Home Masthead',
        //         subtitle: 'Masthead component',
        //         media: () => (
        //             <img 
        //                 src="/images/home-masthead.png" 
        //                 alt="Home Masthead Preview"
        //                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        //             />
        //         )
        //     }
        // }
    }
})