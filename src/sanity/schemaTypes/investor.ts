import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'investor',
  title: 'Investor',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'Vietnamese', value: 'vn'},
          {title: 'English', value: 'en'},
          {title: 'Korean', value: 'ko'},
        ]
      },
      initialValue: 'vn',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'year', title: 'Year', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ]
        }
      ]
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'language'
    },
  },
})
