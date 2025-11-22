"use server"
import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import bcrypt from "bcrypt"


export const loginUser_Patient = async (payload) => {
  const { email, password } = payload;
  const userCollection = dbconnect(collectionNameObj.VD_Patient_Auth);
  const user = await userCollection.findOne({ email });
  if (!user) return null;

  const isPasswordOK = await bcrypt.compare(password, user.password);
  if (!isPasswordOK) return null;

  return user;
}
