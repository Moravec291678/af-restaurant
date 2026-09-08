const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "o9yq1bq1",
  dataset: "production",
  apiVersion: "2026-09-07",
  useCdn: false,
});

client
  .fetch('*[_type == "menuCategory"]{_id,title,order}|order(order asc)')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
