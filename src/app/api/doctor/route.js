import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

 
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


export const POST = async (req) =>{
    const body = await req.json();
    const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    const result = await bookingCollection.insertOne(body);

    return NextResponse.json({result});
}