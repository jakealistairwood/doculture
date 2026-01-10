import { defineField, defineType } from "sanity"
import { ImageIcon } from '@sanity/icons'

export const caseStudyImage = defineType({
    name: 'caseStudyImage',
    title: 'Asset',
    type: 'object',
    icon: ImageIcon,
    fields: [
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
            title: 'Image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
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
            description: 'Poster/placeholder image for the video (required for videos)',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ],
            hidden: ({parent}) => parent?.type !== "video",
            validation: (Rule) => 
                Rule.custom((value, context) => {
                    const parent = context.parent as any;
                    // Check if this is a video type and poster is missing
                    if (parent?.type === "video" && !value) {
                        return "Video poster is required when video type is selected";
                    }
                    return true;
                })
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
    ],
    preview: {
        select: {
            type: 'type',
            image: 'image',
            alt: 'image.alt',
            video: 'video'
        },
        prepare({ type, image, alt, video }) {
            if (type === 'video') {
                return {
                    title: video || 'Video',
                    media: image || null
                }
            }
            return {
                title: alt || 'Image',
                media: image
            }
        }
    }
});


