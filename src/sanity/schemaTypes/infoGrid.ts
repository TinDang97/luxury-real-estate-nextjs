import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'infoGrid',
  title: 'Info Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'content', type: 'array', of: [{type: 'string'}], title: 'Points'},
          ],
        },
      ],
    }),
  ],
})
