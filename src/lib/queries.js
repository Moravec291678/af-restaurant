export const menuItemsQuery = `*[
  _type == "menuItem"
  && active != false
] | order(category->order asc, order asc, name asc) {
  _id,
  name,
  "category": category->{
    _id,
    title,
    "slug": slug.current,
    order,
    active
  },
  description,
  portion,
  price,
  vegetarian,
  allergens,
  image,
  imageAlt,
  variants,
  showAsSpecialty,
  active,
  order
}`;
export const menuCategoriesQuery = `*[
  _type == "menuCategory"
  && active != false
] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  order,
  active
}`;
export const lunchMenuQuery = `*[
  _type == "lunchMenu"
][0]{
  _id,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  items[]{
    title,
    description,
    price
  }
}`;
export const galleryImagesQuery = `*[
  _type == "galleryImage"
  && active != false
] | order(order asc, _createdAt asc) {
  _id,
  image,
  alt,
  active,
  showOnHomepage,
  order
}`;
export const eventsQuery = `*[
  _type == "event"
  && active != false
] | order(date asc, order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  date,
  location,
  description,
  image,
  active,
  order
}`;
export const eventBySlugQuery = `*[
  _type == "event"
  && active != false
  && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  date,
  location,
  description,
  image,
  content,
  active,
  order
}`;
export const reviewsQuery = `*[
  _type == "review"
  && active != false
] | order(order asc, _createdAt asc) {
  _id,
  author,
  text,
  rating,
  active,
  order
}`;
export const restaurantSettingsQuery = `*[
  _type == "restaurantSettings"
][0]{
  _id,
  name,
  shortDescription,
  address{
    line1,
    line2
  },
  phone,
  email,
  openingHours[]{
    day,
    open,
    close
  },
  mapUrl,
  mapEmbedUrl,
  reservationUrl
}`;
