import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        name: 'overview',
        title: 'Overview',
        type: 'text', 
        rows: 3
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'developer',
      title: 'Developer',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price Range',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
            {title: 'Upcoming', value: 'upcoming'},
            {title: 'Selling', value: 'selling'},
            {title: 'Sold Out', value: 'sold-out'},
        ]
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Default Gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'project3DView',
      title: 'Default 3D View',
      type: 'project3DView',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
        {type: 'hero'},
        {type: 'gallery'},
        {type: 'infoTable'},
        {type: 'featureList'},
        {type: 'infoGrid'},
        {type: 'banner'},
        {type: 'mortgageCalculator'},
        {type: 'inlineRegisterForm'},
        {type: 'locationMap'},
        {type: 'videoSection'},
        {type: 'project3DView'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'location'
    },
  },
})
