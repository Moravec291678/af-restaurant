import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "o9yq1bq1",
  dataset: "production",
  apiVersion: "2026-09-07",
  useCdn: true,
});
