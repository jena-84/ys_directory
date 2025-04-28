import { client } from "@/sanity/lib/client";
import {STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import markdownit from 'markdown-it'
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";


const md = markdownit()

export const experimental_ppr = true; // To enable PPR of this page
// This page is for for dynamic routing

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id; //Extract Id from the params
   console.log('id is ---->',id)

  // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id }); // Fetch the post from Sanity CLient with the ID to perform ISR
  // console.log('post is ---->',post)

  //fetching the post and editor picks at the same time using Promise.all using parallel fetching
  // This is to improve the performance of the page and reduce the loading time
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();
  const parseContent = md.render(post?.pitch || '') //parse the markdown content and render it as HTML

  return (
    <>
      <section className="pink_container !min-h-[300px]">
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container " >
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl border"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={60}
                height={60}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>

                <p className="text-26-medium !text-black-300">@{post.author.username}</p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
      {parseContent? (
        <article
        className="prose max-w-4xl font-work-sans break-all"
        // inject the parsed HTM/l safely.to prevent XSS attacks
        dangerouslySetInnerHTML={{ __html: parseContent }}
        />
      ):(
        <p className="no-result">No Details Provided</p>
      )}
        </div>
      <hr className="divider"></hr>
     {/* ToDO:Editor selector */}
     <hr className="divider" />

{editorPosts?.length > 0 && (
  <div className="max-w-4xl mx-auto">
    <p className="text-30-semibold">Editor Picks</p>

    <ul className="mt-7 card_grid-sm">
      {editorPosts.map((post: StartupTypeCard, i: number) => (
        <StartupCard key={i} post={post} />
      ))}
    </ul>
  </div>
)}

     {/* Suspense used with PPR and it has fallback to Suspense in case we can not render something render   */}
     <Suspense fallback={<Skeleton className="view_skeleton"/>}>
       <View id={id}></View>
     </Suspense>
      </section>
    </>
  );
};

export default page;
