import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GoogleProvider({
          // clientId: process.env.GOOGLE_CLIENT_ID as string,
          // clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          clientId: '987339875989-pr0a8v39mkdafjr1k5iocfacnetl8lps.apps.googleusercontent.com',
          clientSecret: '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',
        }), 
        // ...add more providers here
      ],
      pages:{
        
      }
})

export { handler as GET, handler as POST }