const fs = require("fs");

const source = fs.readFileSync("src/pages/Menu.jsx", "utf8");

const start = source.indexOf("const menuItems = [");
const end = source.indexOf("const categories = [");

if (start === -1 || end === -1) {
  throw new Error("Nepodařilo se najít menuItems nebo categories.");
}

let block = source.slice(start, end);

block = block
  .replace(/^const menuItems = /, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/image:\s*[A-Za-z0-9_]+/g, "image: null")
  .replace(/;\s*$/, "")
  .trim();

const menuItems = Function(`"use strict"; return (${block});`)();

console.log(`Nalezeno jídel: ${menuItems.length}`);
console.log("");
console.log(
  menuItems
    .map((item, index) => `${index + 1}. ${item.name} | ${item.category} | ${item.price ?? "varianty"}`)
    .join("\n")
);
