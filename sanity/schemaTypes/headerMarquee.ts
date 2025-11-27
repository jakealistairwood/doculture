import { defineType, defineField } from 'sanity'

export const headerMarquee = defineType({
  name: 'headerMarquee',
  title: 'Header Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ]
})
