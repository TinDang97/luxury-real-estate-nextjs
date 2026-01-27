import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'locationMap',
  title: 'Location Map',
  type: 'object',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
    }),
  ],
})
