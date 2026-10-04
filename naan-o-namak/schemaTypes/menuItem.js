export default {
  name: 'menuItem',
  title: 'Menu item',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name (Czech)', type: 'string'},
    {name: 'nameEn', title: 'Name (English)', type: 'string'},

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    },

    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'menuCategory'}],
    },

    {name: 'description', title: 'Description (Czech)', type: 'text'},
    {name: 'descriptionEn', title: 'Description (English)', type: 'text'},

    {name: 'portion', title: 'Portion (Czech)', type: 'string'},
    {name: 'portionEn', title: 'Portion (English)', type: 'string'},

    {name: 'price', title: 'Price (CZK)', type: 'number'},
    {name: 'vegetarian', title: 'Vegetarian', type: 'boolean'},

    {
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{type: 'number'}],
    },

    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },

    {name: 'imageAlt', title: 'Image alternative text', type: 'string'},
    {name: 'imageAltEn', title: 'Image alternative text (English)', type: 'string'},

    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label (Czech)', type: 'string'},
            {name: 'labelEn', title: 'Label (English)', type: 'string'},
            {name: 'portion', title: 'Portion (Czech)', type: 'string'},
            {name: 'portionEn', title: 'Portion (English)', type: 'string'},
            {name: 'price', title: 'Price (CZK)', type: 'number'},
          ],
        },
      ],
    },

    {
      name: 'showAsSpecialty',
      title: 'Show as specialty',
      type: 'boolean',
      initialValue: false,
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
