"use client";

import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const Appoint_Booking_Form = ({ data }) => {
    const { data: session } = useSession();


    const handleBookService = async (e) => {
        toast("Submitting Booking...");
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const email = form.email.value;
        const channelName = `appointment_${Date.now()}`;



        const bookingPayload = {
            // Session
            customerName: name,
            email,

            // User Inputs
            date,
            phone,
            address,

            // Extra information
            service_id: data._id,
            service_name: data.title,
            service_firstName: data.firstName,
            service_img: data.profilePicture,
            service_price: data.Consultation_Fee,
            channelName,
        };

        console.log(bookingPayload);

        const res = await fetch("http://localhost:3000/api/doctor",{
            method: "POST",
            body: JSON.stringify(bookingPayload),
        }) 

        const postedResponse = await res.json()
        window.location.href = `/video/${postedResponse.channelName}`;
        console.log("POSTED DATA", postedResponse);
    };

    return (
        <div className="my-10">
            <div className="w-11/12 mx-auto">
                <h2 className="text-center text-3xl mb-4">
                    Appointment Book : {data?.title} Name
                </h2>
                
                <form onSubmit={handleBookService}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                defaultValue={session?.user?.name}
                                readOnly
                                type="text"
                                name="name"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                defaultValue={session?.user?.email}
                                readOnly
                                type="text"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due amount</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={data?.Consultation_Fee}
                                readOnly
                                name="price"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Your Phone"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Present Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Your Address"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn btn-primary btn-block"
                            type="submit"
                            value="Order Confirm"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Appoint_Booking_Form;
