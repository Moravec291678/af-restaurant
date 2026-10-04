export default {
  name: 'lunchMenu',
  title: 'Lunch menu',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow (Czech)',
      type: 'string',
    },
    {
      name: 'eyebrowEn',
      title: 'Eyebrow (English)',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title (Czech)',
      type: 'string',
    },
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description (Czech)',
      type: 'text',
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'imageAlt',
      title: 'Image alternative text (Czech)',
      type: 'string',
    },
    {
      name: 'imageAltEn',
      title: 'Image alternative text (English)',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Name (Czech)',
              type: 'string',
            },
            {
              name: 'titleEn',
              title: 'Name (English)',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description (Czech)',
              type: 'text',
            },
            {
              name: 'descriptionEn',
              title: 'Description (English)',
              type: 'text',
            },
            {
              name: 'price',
              title: 'Price (CZK)',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
