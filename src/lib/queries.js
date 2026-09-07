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
