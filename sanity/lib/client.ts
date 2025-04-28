import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // we Set to false if statically generating pages, using ISR or tag-based revalidation ( to always get the latest (new) data)
 //By default set to true to fetch from cache and we don't need to revalidate and see the latest data immediately 
})
