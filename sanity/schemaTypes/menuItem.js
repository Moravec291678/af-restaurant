export default {
  name: "menuItem",
  title: "Menu item",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "menuCategory" }],
    },
    { name: "description", title: "Description", type: "text" },
    { name: "portion", title: "Portion", type: "string" },
    { name: "price", title: "Price (CZK)", type: "number" },
    { name: "vegetarian", title: "Vegetarian", type: "boolean" },
    {
      name: "allergens",
      title: "Allergens",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "imageAlt", title: "Image alternative text", type: "string" },
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "portion", title: "Portion", type: "string" },
            { name: "price", title: "Price (CZK)", type: "number" },
          ],
        },
      ],
    },
  ],
};
