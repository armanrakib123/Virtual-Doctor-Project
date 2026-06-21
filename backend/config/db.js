const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || process.env.MONGODB_URI;

const collectionNameObj = {
    All_Doctor_Collection: "All_Doctor",
    userCollection: "VD_UserAuth",
    VD_Doctor_Auth: "VD_Doctor_Auth",
    VD_Patient_Auth: "VD_Patient_Auth",
    VD_Appointment_Booking: "VD_Appointment_Booking",
    Patient_Profile: "Patient_Profile",
    Live_chat: "Live_chat"
};

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected via Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

const getMongoClient = () => {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client;
};

const dbconnect = (collectionName) => {
    const client = getMongoClient();
    return client.db(process.env.DB_NAME).collection(collectionName);
};

module.exports = { connectDB, dbconnect, collectionNameObj };
