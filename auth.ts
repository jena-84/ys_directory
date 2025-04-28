

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write_client";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub], // Adding GitHub as the provider
// });
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ //to check if the user is already in the database or not
      user: { name, email, image },
      profile: { id, login, bio },
        }) {
      const existingUser = await client
        .withConfig({ useCdn: false }) //
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) { // If the user is not in the database, create a new user
        // Create a new user in the database
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true; // Return true to allow the sign in process to continue
        },
        // This callback is called when the user is signed in
    async jwt({ token, account, profile }) { //to add the user id to the token
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false }) //set to false to both fetch the user and add the user id to the token
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;// Return the token to be used in the session
        },
    async session({ session, token }) { //to add the user id to the session
      session.id = token.id;
      return session;
        },

  },
});
