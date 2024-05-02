import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { compare } from 'bcrypt';

import dbConnection from '@utils/db';
import code from '@utils/responses';

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Invalid email or password");
        
        try {
          // Get the user
          const db = await dbConnection()
          const [result] = await db.query(`SELECT * FROM users WHERE email=?`, [credentials.email])
          db.end()
          // Some conditions
          if (!result.length) throw new Error(code.NOT_FOUND);
          if (!(await compare(credentials.password, result[0].password))) throw new Error(code.WRONG);
          if (!result[0].active) throw new Error(code.NOT_ACTIVE);
          
          // OK
          return result[0];
        } catch (error) {
          throw new Error(error.message)
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from DataBase to session
      const db = await dbConnection()
      const [result] = await db.execute('SELECT id, email, username, image FROM users WHERE email = ?', [session.user.email])

      if (!result.length) return false;

      session.user = result[0]
      db.end()
      return session;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }