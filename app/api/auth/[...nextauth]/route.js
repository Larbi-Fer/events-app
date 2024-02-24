import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        return credentials;
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from DataBase to session

      return session;
    },

    async signIn(params) {
      try {
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }