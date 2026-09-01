# Future Sanity Studio

This folder is intentionally dependency-free. It records the schema design before a Sanity project ID, dataset, and API token have been chosen.

When the Sanity project is ready, install the Studio in a dedicated workspace, copy the schema files from `schemaTypes`, and configure the project ID and dataset there. The React application should continue to use static fallback data until the first Sanity content group is published and verified.

Do not add public write tokens to the Vite application. Read-only content should use Sanity's CDN-backed client configuration; mutations belong in Sanity Studio or a server-side workflow.
