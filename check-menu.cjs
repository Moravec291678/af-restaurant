const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "o9yq1bq1",
  dataset: "production",
  apiVersion: "2026-09-07",
  useCdn: true,
});

async function run() {
  const data = await client.fetch(
    `*[_type == "menuItem"] | order(name asc) {
      _id,
      name,
      price,
      "category": category->title,
      active,
      order
    }`
  );

  console.log("POCET:", data.length);
  console.log(data);
}

run();
