import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: DocumentIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: "title",
            },
        }),
        defineField({
            name: 'pageBuilder',
            title: 'Page Builder',
            type: 'array',
            of: [{ type: 'section' }]
        }),
        defineField({
            name: 'seo',
            type: 'seo'
        })
    ],
    preview: {
        select: {
        title: "title",
        subtitle: "slug.current",
        },
    },
});