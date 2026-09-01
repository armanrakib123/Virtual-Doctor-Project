const express = require("express");
const { dbconnect, collectionNameObj } = require("../config/db");
const { ObjectId } = require("mongodb");
const { addEmailJob } = require("../jobs/queue");

const router = express.Router();

// Mock Payment intent creation
router.post("/create-intent", async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;
    
    // In a real scenario, this would call stripe.paymentIntents.create
    // and return the client_secret to the frontend.
    
    res.json({ 
        success: true, 
        clientSecret: "mock_secret_" + Date.now(),
        message: "Payment intent created successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mock Webhook (To simulate verifying payment from provider)
router.post("/webhook", async (req, res) => {
    try {
        const { appointmentId, status, paymentMethod } = req.body;
        
        // This is a simulation. In production, this would verify the Stripe signature.
        if (status === "succeeded") {
            const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
            await bookingCollection.updateOne(
                { _id: new ObjectId(appointmentId) },
                { $set: { paymentStatus: "Paid", paymentMethod, status: "Confirmed" } }
            );

            // Fetch appointment to get email
            const appointment = await bookingCollection.findOne({ _id: new ObjectId(appointmentId) });
            
            // Queue an email notification using BullMQ
            if (appointment && appointment.email) {
                await addEmailJob({
                    to: appointment.email,
                    subject: "Payment Confirmed - Appointment Booked",
                    body: `Your payment for appointment on ${appointment.date} at ${appointment.timeSlot} has been confirmed.`
                });
            }
            
            return res.json({ received: true, message: "Payment verified and appointment updated" });
        }
        
        res.json({ received: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
