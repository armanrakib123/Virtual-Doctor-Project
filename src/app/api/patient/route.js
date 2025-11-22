
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import dbconnect, { collectionNameObj } from "@/lib/dbconnect";

 
export const GET = async (req) =>{
    const session = await getServerSession(authOptions)
    if(session){
        const email = session?.user?.email;
        const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
        const result = await bookingCollection.find({email}).toArray();

        return NextResponse.json(result);
    }

    return NextResponse.json({});
} 





export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const date = formData.get("date"); // FIXED
    const address = formData.get("address");
    const history = formData.get("history");

    const files = formData.getAll("files");

    const patientData = {
      name,
      email,
      phone,
      date,
      address,
      history,
      files: files.map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
      })),
      createdAt: new Date(),
    };

    const collection = dbconnect(collectionNameObj.Patient_Profile);
    const result = await collection.insertOne(patientData);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};