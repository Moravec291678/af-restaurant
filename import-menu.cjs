const fs = require("fs");

const source = fs.readFileSync("src/pages/Menu.jsx", "utf8");

const start = source.indexOf("const menuItems = [");
const end = source.indexOf("const categories = [");

let block = source
  .slice(start, end)
  .replace(/^const menuItems = /, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/image:\s*[A-Za-z0-9_]+/g, "image: null")
  .replace(/;\s*$/, "")
  .trim();

const menuItems = Function(`"use strict"; return (${block});`)();

const categoryIds = {
  predkrmy: "639fd7a4-c881-4e97-8dc3-b12292cf33b6",
  "polevky-salaty": "menuCategory-polevky-salaty",
  "orientalni-speciality": "menuCategory-orientalni-speciality",
  gril: "menuCategory-gril",
  "mix-grill": "menuCategory-mix-grill",
  vegetarianska: "menuCategory-vegetarianska",
  ryby: "menuCategory-ryby",
  prilohy: "menuCategory-prilohy",
  dezerty: "menuCategory-dezerty",
  nealko: "menuCategory-nealko",
  "domaci-napoje": "menuCategory-domaci-napoje",
  "teple-napoje": "menuCategory-teple-napoje",
  pivo: "menuCategory-pivo",
  vino: "menuCategory-vino",
  "tvrdý-alkohol": "menuCategory-tvrdy-alkohol",
};

const documents = menuItems.map((item, index) => {
  const doc = {
    _id: `menuItem-${item.id}`,
    _type: "menuItem",
    name: item.name,
    category: {
      _type: "reference",
      _ref: categoryIds[item.category],
    },
    description: item.description || "",
    portion: item.portion || "",
    price: item.price ?? null,
    vegetarian: Boolean(item.vegetarian),
    allergens: Array.isArray(item.allergens)
      ? item.allergens.filter((value) => Number.isInteger(value))
      : [],
    variants: Array.isArray(item.variants) ? item.variants : [],
    order: index + 1,
    active: true,
  };

  return doc;
});

fs.writeFileSync(
  "menu-items.ndjson",
  documents.map((doc) => JSON.stringify(doc)).join("\n") + "\n",
  "utf8",
);

console.log(`Vygenerováno ${documents.length} jídel do menu-items.ndjson`);
