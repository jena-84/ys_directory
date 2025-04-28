import React from 'react'
import Ping from '@/components/Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write_client'

import { unstable_after as  after } from 'next/server' // This is a server action that allows us to run code after the component has rendered. It is used to update the views count in Sanity after the component has rendered.

const View = async({id}:{id:string}) => {

 const {views : totalViews} = await client
 .withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id}) 
 //withConfig is used to disable the cache for this query and fetch the latest data
 // and we are using the useCdn:false to disable the cache for this query and fetch the latest data 


 //-----
 //---Updating the views count in Sanity------------------
after(
  async()=>
  await writeClient
 .patch(id)
 .set({views: totalViews +1})
 .commit())
 //----------------

 
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping></Ping>
        </div>

        <p className='view-text'>
            <span className='font-black'>Views:{totalViews}</span>
        </p>
    </div>
  )
  
}

export default View