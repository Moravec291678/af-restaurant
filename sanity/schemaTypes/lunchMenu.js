export default {
  name: "lunchMenu",
  title: "Lunch menu",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "imageAlt", title: "Image alternative text", type: "string" },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "price", title: "Price (CZK)", type: "number" },
          ],
        },
      ],
    },
  ],
};
