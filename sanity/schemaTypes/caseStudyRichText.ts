import { defineField, defineType } from "sanity"

export const caseStudyRichText = defineType({
    name: 'caseStudyRichText',
    title: 'Rich Text',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent'
        })
    ],
    preview: {
        select: {
            content: 'content'
        },
        prepare({ content }) {
            const block = (content || []).find((item: any) => item._type === 'block')
            return {
                title: block
                    ? block.children
                        ?.filter((child: any) => child._type === 'span')
                        ?.map((span: any) => span.text)
                        ?.join('') || 'Rich Text'
                    : 'Rich Text'
            }
        }
    }
});


