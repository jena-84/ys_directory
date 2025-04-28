// This file is used to extend the types of next-auth
declare module 'next-auth-d'{
    interface Session{
        id:string
    }

    interface JWT {
        id:string
    }
}
