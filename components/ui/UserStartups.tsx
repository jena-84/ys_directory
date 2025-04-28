import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const UserStartup = async({id}:{id:string}) => {
   const startup = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})

  return (
    <>
    {startup.length > 0 ? (
      startup.map((startup : StartupTypeCard)=>(
      <StartupCard key={startup._id} post={startup}/>
    ))
     ):(
        <p className='no-result'>No posts yet</p>
      )}
    
    </>
  )
}

export default UserStartup