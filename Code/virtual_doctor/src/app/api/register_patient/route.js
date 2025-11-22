
// import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
// import { sendWelcomeEmail } from "@/lib/sendEmail";
// import bcrypt from "bcrypt";
// import toast from "react-hot-toast";

// export async function POST(req) {
//     try {
//         const payload = await req.json();
//         const userCollection = dbconnect(collectionNameObj.VD_Patient_Auth);

//         const { email, password, name } = payload;
//         if (!email || !password || !name) {
//             return new Response(JSON.stringify({ error: "All fields required" }), {
//                 status: 400,
//             });
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return new Response(JSON.stringify(toast.error("Invalid email format")), {
//                 status: 400,
//             });

//         }

//         const user = await userCollection.findOne({ email });
//         if (user) {
//             return new Response(JSON.stringify(toast.dismiss("User already exists")), {
//                 status: 400,
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const doc = {
//             name,
//             email,
//             password: hashedPassword,
//             role: "patient",
//             createdAt: new Date()
//         };
//         const result = await userCollection.insertOne(
//              doc
//         );

//         await sendWelcomeEmail(email, name);

//         return new Response(JSON.stringify({ success: true, id: result.insertedId.toString() }), {
//             status: 201,
//         });
//     } catch (err) {
//         return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//     }
// }
















import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import { sendWelcomeEmail } from "@/lib/sendEmail";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    const userCollection = dbconnect(collectionNameObj.VD_Patient_Auth);

    if (!email || !password || !name) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }


    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return Response.json(
        {
          error:
            "Password must be min 6 chars, include uppercase, lowercase, number & special character (!@#$%).",
        },
        { status: 400 }
      );
    }

    const exists = await userCollection.findOne({ email });
    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const doc = {
      name,
      email,
      password: hashed,
      role: "patient",
      createdAt: new Date()
    };

    const result = await userCollection.insertOne(doc);

    await sendWelcomeEmail(email, name);

    return Response.json({ success: true, id: result.insertedId }, { status: 201 });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
