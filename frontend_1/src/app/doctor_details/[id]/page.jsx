import Link from 'next/link';
import React from 'react'
import { FaVideo } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { IoBagAddOutline } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";


export default async function DoctorDetailsPage({ params }) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${id}`,
        { cache: "no-store" });


    if (!res.ok) {
        throw new Error("Failed to load doctor details");
    }

    const data = await res.json();

    return (
        <div className="py-10 px-4 sm:px-6 lg:px-20 mt-24 space-y-6">

            {/* Doctor Main Info */}
            <div className='px-4 py-5 rounded-2xl shadow-md bg-gray-200'>

                <div className='flex flex-col lg:flex-row gap-8 lg:gap-20'>

                    {/* Left: Image + Info */}
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
                        <img
                            src={data.profilePicture}
                            alt={data.title}
                            className="rounded-xl w-full lg:w-[400px] h-auto object-cover"
                        />

                        <div className='flex flex-col justify-between'>
                            <div>
                                <div className='flex flex-wrap gap-2 text-2xl font-bold'>
                                    <span>{data.title}</span>
                                    <span>{data.firstName}</span>
                                    <span>{data.lastName}</span>
                                </div>
                                <div className='text-gray-700 mt-1'>{data.qualifications[0]}</div>
                                <div className='text-gray-700'>{data.specialty}</div>
                                <div className='text-gray-700 mt-1'>
                                    Working at <span className='font-bold'>{data.hospitalAffiliation}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Fee + Buttons */}
                    <div className='flex flex-col gap-4 items-center lg:items-start'>
                        <div className='text-center lg:text-left font-bold text-2xl'>Consultant Fee</div>
                        <div className='flex items-center text-blue-700 font-bold text-2xl gap-1'>
                            <FaBangladeshiTakaSign />
                            <span>{data.Consultation_Fee}</span>
                        </div>

                        <Link href={`/video/${data.channelName}`}>
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-full flex items-center gap-2">
                                <FaVideo /> See Doctor Now
                            </button>
                        </Link>

                        <Link href={`/appointments/${data._id}`}>
                            <button className='bg-red-300 btn w-full lg:w-64 h-12 lg:h-14 mt-2 rounded-2xl font-bold'>
                                Appointments
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Experience / BMDC / Rating */}
                <div className='mt-6 flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 w-full'>
                    <div className='flex justify-between sm:justify-start sm:gap-8'>
                        <div>
                            <div>Total Experience</div>
                            <div className='font-bold'>{data.yearsOfExperience} Years+</div>
                        </div>
                        <div>
                            <div>BMDC Number</div>
                            <div className='font-bold'>{data.licensingInfo.licenseNumber}</div>
                        </div>
                        <div>
                            <div>Ratings</div>
                            <div className='flex items-center gap-1'>
                                <span className='font-bold'>{data.ratings}</span>
                                <IoStarHalfSharp />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className='flex flex-wrap gap-4 mt-4'>
                    <div className='hover:border-b-2 flex gap-1 items-center cursor-pointer'>
                        <BsInfoCircle /><span>Info</span>
                    </div>
                    <div className='hover:border-b-2 flex gap-1 items-center cursor-pointer'>
                        <IoBagAddOutline /><span>Experience</span>
                    </div>
                    <div className='hover:border-b-2 flex gap-1 items-center cursor-pointer'>
                        <MdOutlineReviews /><span>Reviews</span>
                    </div>
                </div>
            </div>

            {/* About + Availability */}
            <div className='flex flex-col lg:flex-row gap-4'>

                {/* About */}
                <div className='flex-1 shadow-md bg-gray-200 rounded-2xl p-4'>
                    <div className='flex flex-wrap font-bold gap-1 mb-2'>
                        <span>About {data.title}</span>
                        <span>{data.firstName}</span>
                        <span>{data.lastName}:</span>
                    </div>
                    <p className='text-gray-700'>{data.bio}</p>
                </div>

                {/* Availability */}
                <div className='flex-1 shadow-md bg-gray-200 rounded-2xl p-4'>
                    <div className='font-bold mb-2'>Availability</div>
                    <div className="border-l-2 border-blue-700 pl-4 py-2">
                        <div className="text-gray-700">Instant Consultation Time</div>
                        <div className="font-bold text-gray-900">{data.workingHours}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}