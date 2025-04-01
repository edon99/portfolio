import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'pgwopmzt', 
  dataset: 'production', 
  apiVersion: '2024-03-30', // Use the latest version or the one you used in Sanity
  useCdn: false, 
});
