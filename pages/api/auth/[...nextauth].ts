import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import EmailProvider from "next-auth/providers/email"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import CredentialsProvider from "next-auth/providers/credentials";
import { DgraphAdapter, DgraphClientParams } from "@next-auth/dgraph-adapter"

const dgraphAdapterInput = ():DgraphClientParams=> {
  if (typeof process.env.DGRAPH_GRAPHQL_ENDPOINT == 'string' && typeof process.env.DGRAPH_GRAPHQL_KEY=='string') {
    return {
      endpoint: process.env.DGRAPH_GRAPHQL_ENDPOINT,
      authToken: process.env.DGRAPH_GRAPHQL_KEY
    }
  } else {
    throw 'Server Configuration error!';
  }
}

// const getUser = ({username,password}:credentials) => {
//   if (username==="ray@nlist.com.au"&&password==="password") {
//     return {id:1, name: 'ray', email: 'ray@nlist.com.au', image: null}
//   }
// }
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    /* CredentialsProvider({
      //Can not use with the dgraph adapter.  Perhaps I can modify the adapter in future to enable.
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your_user_name" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let user;
        console.log('credentials supplied ',credentials);
        console.log('req in authorize ',req);
        user=getUser({username:"ray@nlist.com.au",password:"password"});        
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }), */
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      console.log('token supplied ',token);
      token.userRole = "admin"
      console.log('token ',token);
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
  },
  adapter: DgraphAdapter(dgraphAdapterInput())
}

export default NextAuth(authOptions)
