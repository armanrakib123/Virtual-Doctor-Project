import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import dbconnect, { collectionNameObj } from "@/lib/dbconnect";

export const GET = async (req, { params }) => {

  const { id } = await params;
  const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);

  const query = { _id: new ObjectId(id) };
  const singleBooking = await bookingCollection.findOne(query);

  if (!singleBooking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json(singleBooking);
};

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);

  const body = await req.json(); 
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      date: body.date,
      phone: body.phone,
      address: body.address,
      
    },
  };

  const result = await bookingCollection.updateOne(filter, updateDoc);

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
};
