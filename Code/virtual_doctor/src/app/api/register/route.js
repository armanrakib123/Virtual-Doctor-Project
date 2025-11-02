
import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const payload = await req.json();
        const userCollection = dbconnect(collectionNameObj.userCollection);

        const { email, password, name } = payload;
        if (!email || !password || !name) {
            return new Response(JSON.stringify({ error: "All fields required" }), {
                status: 400,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: "Invalid email format" }), {
                status: 400,
            });
        }

        const user = await userCollection.findOne({ email });
        if (user) {
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userCollection.insertOne({
            ...payload,
            password: hashedPassword,
        });

        return new Response(JSON.stringify({ success: true, id: result.insertedId.toString() }), {
            status: 201,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
