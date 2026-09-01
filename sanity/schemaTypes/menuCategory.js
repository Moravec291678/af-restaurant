export default {
  name: "menuCategory",
  title: "Menu category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    { name: "order", title: "Display order", type: "number" },
  ],
};
