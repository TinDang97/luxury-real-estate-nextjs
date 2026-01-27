// Use safe access to env vars
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-24';
export const useCdn = false;

import { createClient } from "next-sanity";

// Build-safe client: If config is missing (e.g. during build without env), return a mock
// that returns null/empty to allow build to proceed without generating content.
export const client = (projectId && dataset) 
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    }) 
  : {
      fetch: async () => {
        console.warn('Sanity configuration missing. Returning null for fetch.');
        return null; // Fallback for queries
      },
      // Mock other methods if needed, but fetch is primary for SSG
    } as unknown as ReturnType<typeof createClient>;
