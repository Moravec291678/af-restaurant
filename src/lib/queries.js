export const menuItemsQuery = `*[
  _type == "menuItem"
  && active != false
] | order(category->order asc, order asc, name asc) {
  _id,
  name,
   nameEn,
  "category": category->{
  _id,
  title,
  titleEn,
  "slug": slug.current,
  order,
  active
},
  description,
  descriptionEn,
  portion,
  portionEn,
  price,
  vegetarian,
  allergens,
  image,
  imageAlt,
  imageAltEn,
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
  titleEn,
  "slug": slug.current,
  order,
  active
}`;

export const lunchMenuQuery = `*[
  _type == "lunchMenu"
][0]{
  _id,
  eyebrow,
  eyebrowEn,
  title,
  titleEn,
  description,
  descriptionEn,
  image,
  imageAlt,
  imageAltEn,
  items[]{
    title,
    titleEn,
    description,
    descriptionEn,
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
  altEn,
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
  titleEn,
  "slug": slug.current,
  date,
  location,
  locationEn,
  description,
  descriptionEn,
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
  titleEn,
  "slug": slug.current,
  date,
  location,
  locationEn,
  description,
  descriptionEn,
  image,
  content,
  contentEn,
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
  textEn,
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
  shortDescriptionEn,
  address{
    line1,
    line2
  },
  phone,
  email,
 openingHours[]{
  day,
  dayEn,
  open,
  close
},
mapUrl,
  mapEmbedUrl,
  reservationUrl
}`;
