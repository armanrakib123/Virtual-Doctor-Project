import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";


export const DELETE = async (req, {params}) =>{
  const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
  const p = await params;
  const query = {_id: new ObjectId(p.id)}

  const session = await getServerSession(authOptions)
  const currentBooking = await bookingCollection.findOne(query)
  const isOwnerOk = session?.user?.email === currentBooking.email
  
  if(isOwnerOk){
    const deleteResponse = await bookingCollection.deleteOne(query)

    revalidatePath("/My_Bookings")
    return NextResponse.json(deleteResponse)
  }
  else{
    return NextResponse.json({success:false, massage:"Error"})
  }
}


export const GET = async (req, { params }) => {
  const db = dbconnect(collectionNameObj.All_Doctor_Collection);
  const data = await db.findOne({ _id: new ObjectId(params.id) });

  data._id = data._id.toString();

  return NextResponse.json(data);
};
