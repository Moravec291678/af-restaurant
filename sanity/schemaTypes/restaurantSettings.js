export default {
  name: "restaurantSettings",
  title: "Restaurant settings",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "shortDescription", title: "Short description", type: "text" },
    {
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "line1", title: "Address line", type: "string" },
        { name: "line2", title: "Address detail", type: "string" },
      ],
    },
    { name: "phone", title: "Phone", type: "string" },
    { name: "email", title: "Email", type: "string" },
    {
      name: "openingHours",
      title: "Opening hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Day", type: "string" },
            { name: "open", title: "Opens", type: "string" },
            { name: "close", title: "Closes", type: "string" },
          ],
        },
      ],
    },
    { name: "mapUrl", title: "Map URL", type: "url" },
    { name: "mapEmbedUrl", title: "Map embed URL", type: "url" },
    { name: "reservationUrl", title: "Reservation URL", type: "url" },
  ],
};
