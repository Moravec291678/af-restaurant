export default {
  name: "menuCategory",
  title: "Menu category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Name",
      type: "string",
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },

    {
      name: "order",
      title: "Display order",
      type: "number",
    },

    {
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    },
  ],
};