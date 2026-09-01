# Sanity CMS Progress

## Project

- Project path: `C:\Users\David\Desktop\safi-restaurant\afganistan-restaurant`
- Current stack: React 19 + Vite 8
- Goal: prepare the existing website for a future Sanity CMS integration without changing its current design, routes, or displayed content.

## Completed

### 2026-09-01 - Content audit

The existing static content has been mapped. No visible content, styling, layout, routing, or dependency has been changed in this checkpoint.

| Area | Current source | Future Sanity content type |
| --- | --- | --- |
| Restaurant settings, contacts and opening hours | `Hero.jsx`, `Contact.jsx`, `Footer.jsx` | `restaurantSettings` |
| Homepage hero text and calls to action | `Hero.jsx` | `homePage` |
| About preview | `AboutPreview.jsx` | `homePage` |
| Featured specialties | `Specialties.jsx` | `homePage` / references to `menuItem` |
| Lunch menu | `LunchMenu.jsx` | `lunchMenu` |
| Full food and drinks menu | `Menu.jsx` | `menuCategory`, `menuItem` |
| Gallery | `Gallery.jsx` | Not in scope for this integration phase; it is only recorded as existing content. |

### 2026-09-01 - Schema drafts and build verification

- Added dependency-free schema drafts in `sanity/schemaTypes` for restaurant settings, menu categories, menu items, and lunch menus.
- Added `sanity/README.md` with the safe Studio setup boundary and token guidance.
- Verified the current application with `npm run build` successfully.

## Existing-data notes

These inconsistencies are intentionally not corrected yet. They need one confirmed source of truth before the corresponding CMS fields are populated.

- Restaurant identity differs between the project brief (`Safi Restaurant`) and the rendered content (`Naan O Namak`, plus a few `Kabura` labels).
- Address differs: Hero shows `Kvetnoveho povstani 21/21`; Contact/Footer and map use `Vodickova 12, Praha 1`.
- Telephone differs: Hero displays `+420 721 700 777`, while its link and Contact/Footer use `+420 123 456 789`.
- Email differs: `info@naan-o-namak.cz` and `info@naanonamak.cz`.
- Opening hours differ between Hero, Contact, and Footer.
- `Menu.jsx` contains a placeholder allergen value (`test`) for Falafel and many empty allergen arrays.

## Proposed CMS model

### `restaurantSettings`

- name, shortDescription, address, phone, email
- openingHours (day, open, close)
- mapUrl, mapEmbedUrl
- reservationUrl

### `homePage`

- hero (badge, title, description, primaryAction, secondaryAction)
- aboutPreview (eyebrow, title, description, image, imageAlt, actionLabel)
- featuredMenuItems (references to `menuItem`)

### `menuCategory`

- title, slug, order

### `menuItem`

- title, slug, category, description, portion, price
- vegetarian, allergens, image, imageAlt
- variants (label, portion, price)

### `lunchMenu`

- title, eyebrow, description, image, imageAlt
- items (title, description, price)

## Integration approach

1. Keep the current static data as the production fallback while defining compatible data contracts.
2. Add the Sanity Studio package and environment variables only after the project and dataset are created.
3. Build a small content adapter so components receive the same shape whether data is static or comes from Sanity.
4. Migrate one content group at a time, starting with restaurant settings, then menu categories and menu items.

## Next checkpoint

Create the non-runtime Sanity schema drafts and static data contracts. This will not require any current content to be changed or any UI component to render differently.
