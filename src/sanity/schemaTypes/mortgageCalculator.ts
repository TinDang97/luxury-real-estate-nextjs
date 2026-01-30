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
    },
    {
      name: 'priceOptions',
      title: 'Price Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'number', title: 'Value (VND)'},
          ],
        },
      ],
    }
  ],
})
