import {defineType} from 'sanity'

export default defineType({
  name: 'mortgageCalculator',
  title: 'Mortgage Calculator',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'defaultPrice',
      title: 'Default Project Price',
      type: 'number',
    }
  ],
})
