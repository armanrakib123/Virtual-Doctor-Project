import { NextResponse } from "next/server";
import dbconnect, { collectionNameObj } from "@/lib/dbconnect";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const doctorCollection = dbconnect(collectionNameObj.All_Doctor_Collection);

    const result = await doctorCollection.insertOne(body);

    return NextResponse.json({
      success: true,
      message: "Doctor profile saved successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
