import {defineType} from 'sanity'

export default defineType({
  name: 'inlineRegisterForm',
  title: 'Inline Register Form',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    }
  ],
})
