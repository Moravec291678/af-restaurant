export default {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "text",
      title: "Review text",
      type: "text",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "order",
      title: "Display order",
      type: "number",
    },
  ],
};
