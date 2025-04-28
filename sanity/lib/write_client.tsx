//added this import 
import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'   


export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  //useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  useCdn: false, // to ensure always fresh data
  token, // Only if you want to update content with the client 
})
// This client is used to update content in Sanity
if (!writeClient.config().token){
    throw new Error('Write token not found')
}