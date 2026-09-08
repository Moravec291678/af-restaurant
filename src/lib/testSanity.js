import { sanityClient } from "./sanityClient";
import { menuItemsQuery } from "./queries";

export async function testSanityConnection() {
  const data = await sanityClient.fetch(menuItemsQuery);
  console.log("Sanity menu data:", data);
  return data;
}
