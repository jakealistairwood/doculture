import { defineField, defineType } from 'sanity'

export const fullWidthAsset = defineType({
    name: 'fullWidthAsset',
    title: 'Full Width Asset',
    type: 'object',
    fields: [
        defineField({
            name: 'id',
            title: 'ID',
            type: 'string',
            description: 'Useful if you want a button to link to this asset (e.g. #showreel-2025)'
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { value: 'image', title: 'Image' },
                    { value: 'video', title: 'Video' }
                ],
                layout: 'radio'
            },
            initialValue: 'image'
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'altText',
                    title: 'Alt Text',
                    type: 'string'
                }
            ],
            hidden: ({parent}) => parent?.type !== "image"
        }),
        defineField({
            name: 'video',
            title: 'Video',
            type: 'string',
            description: 'Please enter the URL of the video you want to display',
            hidden: ({parent}) => parent?.type !== "video"
        }),
        defineField({
            name: 'videoPoster',
            title: 'Video Poster',
            type: 'image',
            description: 'Allows you to add a poster/placeholder image for the video',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'altText',
                    title: 'Alt Text',
                    type: 'string'
                }
            ],
            hidden: ({parent}) => parent?.type !== "video"
        }),
        defineField({
            name: 'videoOptions',
            title: 'Video Options',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string'
                }),
            ],
            hidden: ({parent}) => parent?.type !== 'video'
        })
    ]
})