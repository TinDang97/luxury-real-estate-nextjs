import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoSection',
  title: 'Video Section',
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
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'The URL of the YouTube video (e.g., https://www.youtube.com/watch?v=...)',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
