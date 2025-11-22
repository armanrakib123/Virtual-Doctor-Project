import { MongoClient, ServerApiVersion } from "mongodb"
const uri = process.env.NEXT_PUBLIC_MONGODB_URI

export const collectionNameObj = {
    All_Doctor_Collection:"All_Doctor",
    userCollection:"VD_UserAuth",
    VD_Doctor_Auth:"VD_Doctor_Auth",
    VD_Patient_Auth:"VD_Patient_Auth",
    VD_Appointment_Booking:"VD_Appointment_Booking",
    Patient_Profile:"Patient_Profile",
    Live_chat:"Live_chat"
}

export default function dbconnect(collectionName) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.DB_NAME).collection(collectionName)
}