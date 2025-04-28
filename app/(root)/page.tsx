import StartupCard , {StartupTypeCard}  from "@/components/StartupCard";
import SearchForm  from "../../components/SearchForm";
//import { client } from "@/sanity/lib/client"; // This is the old fetch method
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";


//import { signIn } from "@/auth"
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  //this method for url modifying server rendering
  //it will be used to get the query from the url
  // Then pass it to the Sanity query
  const query = (await searchParams).query;
 const params = {search : query || null} //for searching the posts

 //Extract session
 const session = await auth()
 console.log(session?.id)
 
  // ---------Fetching Posts from Sanity--------------
  //const posts = await client.fetch(STARTUPS_QUERY); // Fetch the posts from Sanity (OLD FETCH)
  const {data : posts} = await sanityFetch({query :STARTUPS_QUERY, params })//FETCH posts from Sanity with live updates (revalidate the fetch when new changes)
  //console.log(JSON.stringify(posts, null ,2)) // to Style the output in terminal 


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup <br />
          Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches , and Get Noticed in Virtual
          Competitions.
        </p>

       <SearchForm query={query} />
      </section>

      <section className="section_container">
       <p className="text-30-semibold">
        {query ? `Search results for ${query}` : `All Startups`}
       </p>
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ?(
        posts.map((post: StartupTypeCard , index : number)=>{
          return(
           <StartupCard key={post?._id} post={post}/>
               )
              }) 
            ):(
              <p className="no-results">No Startup Found</p>
            )}
    </ul>
      </section>
    </>
  );
}


  // Fake posts for testing before creating Sanity 
  // const posts =[
  //   {
  //     _createdAt: new Date(),
  //     views:55,
  //     author:{_id:1, name:'John'},
  //     _id:1,
  //     description:'This is a description',
  //     image:'https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     category:'Robots',
  //     title:'We Robots'
  //   },
  // ]
