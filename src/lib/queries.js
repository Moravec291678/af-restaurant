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
