import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { Badge, BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";


const Navbar = async() => {
    const session = await auth()

    console.log('sessin', session)
 return(
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href='/'>
            <Image src='/logo.png' alt='logo' width={144} height={30}/>
            </Link>
            <div className='flex items-center gap-5 text-black'>
                { session && session?.user ?(
                <>
                <Link href='/startup/create'>
                {/* style added for mobile responsive */}
                <span className="max-sm:hidden">Create</span> 
                <BadgePlus className='size-6 sm:hidden' />
                </Link>
                <form
                    action={async () => {
                      "use server"
                      await signOut()
                    }}>
                    <button type="submit">Logout</button>
                  </form>
                  <Link href={`/user/${session?.id}`}> 
                 <Avatar className='size-10'>
                   <AvatarImage
                     src ={session?.user?.image || ''}
                     alt={session?.user?.name || ''}
                   />
                   <AvatarFallback>AV</AvatarFallback>
                 </Avatar>
               </Link>
                </>
                ):(
                <form
                    action={async () => {
                      "use server"
                      await signIn("github")
                    }}
                  >
                    <button type="submit">
                      <span className="max-sm:hidden">Logout</span>
                      <button type="submit">Login</button>
                    </button>
                  </form>
                )}
            </div>
        </nav>
    </header>
 )
}

export default Navbar