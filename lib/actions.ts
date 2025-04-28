
"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import  slugify  from "slugify";
import { writeClient } from "@/sanity/lib/write_client";


//-----CREATE A PITCH --------
export const createPitch = async (
    // 1-Getting params from the form
  state: any,
  form: FormData,
  pitch: string
) => {
    // 2- extract the session 
  const session = await auth();
// 3- check the session 
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
 //4- destructure (extract) all the values the form data
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

// 5- create the slug after install Slugify
  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  });
//
  try {
    const startup = { // 6- create the startup object
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

// write to Sanity to create the startup
    const result = await writeClient.create({ _type: "startup", ...startup });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });


  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
//---Back to startup form page ----

