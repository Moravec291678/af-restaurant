export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Name (Czech)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titleEn',
      title: 'Name (English)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'date',
      title: 'Date and time',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location (Czech)',
      type: 'string',
    },
    {
      name: 'locationEn',
      title: 'Location (English)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Short description (Czech)',
      type: 'text',
    },
    {
      name: 'descriptionEn',
      title: 'Short description (English)',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Event detail (Czech)',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'contentEn',
      title: 'Event detail (English)',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
    },
  ],
}
