import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { compare } from 'bcrypt';

import db from '@utils/database';
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
          const result = await new Promise((resolve, reject) => {
            // Get the user
            db.query(`SELECT * FROM users WHERE email=?`, [credentials.email], async(err, result) => {
              if (err) return reject(err);

              // Some conditions
              if (!result.length) return reject(code.NOT_FOUND);
              if (!(await compare(credentials.password, result[0].password))) return reject(code.WRONG);
              if (!result[0].active) return reject(code.NOT_ACTIVE);
              // OK
              return resolve(result[0])
            })
          })
          return result;
        } catch (error) {
          throw new Error(error)
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from DataBase to session
      const result = await new Promise((resolve, reject) => {
        db.query('SELECT id, email, username, image FROM users WHERE email = ?', [session.user.email], (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        })
      })

      if (!result) return false;

      session.user = result
      return session;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }