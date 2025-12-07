import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const landingPage = defineType({
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    icon: DocumentIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Internal title for this landing page'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'template',
            title: 'Template',
            type: 'string',
            options: {
                list: [
                    { value: 'contact', title: 'Contact' },
                    { value: 'about', title: 'About' }
                ],
                layout: 'radio'
            },
            initialValue: 'contact',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'contactLandingPage',
            title: 'Contact Landing Page',
            type: 'contactLandingPage',
            hidden: ({parent}) => parent?.template !== 'contact'
        }),
        defineField({
            name: 'aboutLandingPage',
            title: 'About Landing Page',
            type: 'aboutLandingPage',
            hidden: ({parent}) => parent?.template !== 'about'
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo'
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
            template: 'template'
        },
        prepare({ title, subtitle, template }) {
            return {
                title: title || 'Untitled Landing Page',
                subtitle: `${subtitle || 'no-slug'} (${template || 'contact'})`
            }
        }
    }
});

