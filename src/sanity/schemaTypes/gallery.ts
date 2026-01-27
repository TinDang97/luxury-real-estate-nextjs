import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text'
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'images.0',
    },
    prepare({title, media}) {
        return {
          title: title || 'Untitled Gallery',
          subtitle: 'Gallery Section',
          media,
        }
    }
  },
})
