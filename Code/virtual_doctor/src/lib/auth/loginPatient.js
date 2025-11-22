import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import bcrypt from "bcrypt";

export async function loginUser_Patient({ email, password }) {
  const col = dbconnect(collectionNameObj.VD_Patient_Auth);

  const user = await col.findOne({ email });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: "patient",
  };
}
