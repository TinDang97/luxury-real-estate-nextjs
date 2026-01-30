import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureList',
  title: 'Feature List',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', type: 'string', title: 'Icon (Emoji or Text)'},
            {name: 'image', type: 'image', title: 'Feature Image', options: {hotspot: true}},
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description'},
          ],
        },
      ],
    }),
  ],
})
