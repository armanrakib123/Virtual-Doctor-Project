// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google";

// import NextAuth from "next-auth"

// import { loginUser } from "../../login_patient/route";
// import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
// import { sendWelcomeEmail } from "@/lib/sendEmail";

// export const authOptions = {

//   providers: [
//     CredentialsProvider({

//       name: 'Credentials',

//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "Enter Email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {


//         const user = await loginUser(credentials);


//         if (user) {
//           return user
//         }
//         // Return null if user data could not be retrieved
//         return null
//       }
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login"
//   },
//   callbacks: {






//     // async signIn({ user, account, profile, email, credentials }) {
//     //   // console.log({user, account, profile, email, credentials})
//     //   if(account){
//     //     const{providerAccountId, provider}=account;
//     //     const{email: user_email, image, name}=user;
//     //     const VD_Patient_Auth = dbconnect(collectionNameObj.VD_Patient_Auth);
//     //     const isExister=await VD_Patient_Auth.findOne({providerAccountId})
//     //     if(!isExister){
//     //       const payload = {providerAccountId, provider, 
//     //         email:user_email, image, name};
//     //       await VD_Patient_Auth.insertOne(payload);
//     //     }
//     //   }
//     //   return true
//     // }



//     async signIn({ user, account, profile, email, credentials }) {
//       if (account) {
//         const { providerAccountId, provider } = account;
//         const { email: user_email, image, name } = user;
//         const VD_Patient_Auth = dbconnect(collectionNameObj.VD_Patient_Auth);

//         const existingUser = await VD_Patient_Auth.findOne({ providerAccountId });

//         if (!existingUser) {
//           // New user (first time login with Google)
//           const payload = {
//             providerAccountId,
//             provider,
//             email: user_email,
//             image,
//             name,
//             createdAt: new Date(),
//           };

//           await VD_Patient_Auth.insertOne(payload);

//           // 👇 Send Welcome Email only first time
//           try {
//             await sendWelcomeEmail(user_email, name || "User");
//           } catch (err) {
//             console.error("Error sending welcome email:", err);
//           }
//         }
//       }
//       return true;
//     }

//   }


// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }































// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// import { cookies } from "next/headers";
// import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
// import { loginUser_Doctor } from "../../login_doctor/route";
// import { loginUser_Patient } from "../../login_patient/route";
// import { sendWelcomeEmail } from "@/lib/sendEmail";

// export const authOptions = {
//   providers: [
    
//     CredentialsProvider({
//       id: "doctor-login",
//       name: "Doctor Login",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await loginUser_Doctor(credentials);
//         if (user) return { ...user, role: "doctor" };
//         return null;
//       },
//     }),

    
//     CredentialsProvider({
//       id: "patient-login",
//       name: "Patient Login",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await loginUser_Patient(credentials);
//         if (user) return { ...user, role: "patient" };
//         return null;
//       },
//     }),

    
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: { signIn: "/login" },


//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.role = user.role || token.role;
//       }

   
//       if (account?.provider === "google") {
//         const cookieStore = cookies();
//         let roleCookie = cookieStore.get("vd_role")?.value;
//         let targetRole = roleCookie === "doctor" ? "doctor" : "patient";
//         token.role = targetRole;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.role = token.role || "patient";
//       return session;
//     },

//     async signIn({ user, account }) {
//       try {
//         if (account?.provider === "google") {
//           const email = user.email;
//           const name = user.name || "User";
//           const image = user.image || "";

//           const cookieStore = cookies();
//           let roleCookie = cookieStore.get("vd_role")?.value;
//           let role = roleCookie === "doctor" ? "doctor" : "patient";

//           const getCollection = (role) =>
//             role === "doctor"
//               ? dbconnect(collectionNameObj.VD_Doctor_Auth)
//               : dbconnect(collectionNameObj.VD_Patient_Auth);

//           const col = getCollection(role);

//           const existing = await col.findOne({ email });

//           if (!existing) {
//             await col.insertOne({
//               email,
//               name,
//               image,
//               provider: "google",
//               role,
//               createdAt: new Date(),
//             });


//             try {
//               await sendWelcomeEmail(email, name);
//             } catch (e) {
//               console.log("Email send error", e);
//             }
//           } else {
//             await col.updateOne(
//               { email },
//               { $set: { name, image, lastLoginAt: new Date() } }
//             );
//           }
//         }
//       } catch (err) {
//         console.error("Google signIn error: ", err);
//       }

//       return true;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


























import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import { cookies } from "next/headers";

import { loginUser_Doctor } from "@/lib/auth/loginDoctor";
import { loginUser_Patient } from "@/lib/auth/loginPatient";
import { sendWelcomeEmail } from "@/lib/sendEmail";

export const authOptions = {
  pages: {
    signIn: "/Login/doctor",
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
   
    CredentialsProvider({
      id: "doctor-login",
      name: "Doctor Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser_Doctor(credentials);
        if (!user) return null;
        return { ...user, role: "doctor" };
      },
    }),


    CredentialsProvider({
      id: "patient-login",
      name: "Patient Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser_Patient(credentials);
        if (!user) return null;
        return { ...user, role: "patient" };
      },
    }),


    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {

    async jwt({ token, user, account }) {

      if (user) {
        token.role = user.role;
      }


      if (account?.provider === "google") {
        const roleCookie = cookies().get("vd_role")?.value;
        token.role = roleCookie === "doctor" ? "doctor" : "patient";
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      const email = user.email;
      const name = user.name;
      const image = user.image;

      const roleCookie = cookies().get("vd_role")?.value;
      const role = roleCookie === "doctor" ? "doctor" : "patient";

      const getCol = (role) =>
        role === "doctor"
          ? dbconnect(collectionNameObj.VD_Doctor_Auth)
          : dbconnect(collectionNameObj.VD_Patient_Auth);

      const col = getCol(role);

      const exists = await col.findOne({ email });

      if (!exists) {
        await col.insertOne({
          email,
          name,
          image,
          provider: "google",
          role,
          createdAt: new Date(),
        });

   
        await sendWelcomeEmail(email, name);
       
      } else {
        await col.updateOne(
          { email },
          { $set: { name, image, lastLoginAt: new Date() } }
        );
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
