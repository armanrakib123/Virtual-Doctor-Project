import Link from 'next/link';
import React from 'react'
import { FaVideo } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { IoBagAddOutline } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";


export default async function DoctorDetailsPage({ params }) {
    const res = await fetch(`http://localhost:3000/api/doctor/${params.id}`);
    const data = await res.json();

    return (
        <div className="py-20 px-20 mt-24 space-y-4">
            <div className='px-5 py-5 rounded-2xl shadow-base-300 bg-gray-200'>
                <div>
                    <div className='flex gap-96'>
                        <div className='flex  gap-30'>
                            <img
                                src={data.profilePicture}
                                alt={data.title}
                                width={400}
                                height={200}
                                className="rounded-xl"
                            />
                            <div className='pt-15'>
                                <div>
                                    <div className='flex gap-1.5'>
                                        <h1 className="text-2xl font-bold">{data.title}</h1>
                                        <h1 className="text-2xl font-bold">{data.firstName}</h1>
                                        <h1 className="text-2xl font-bold">{data.lastName}</h1>
                                    </div>

                                    <div>{data.qualifications[0]}</div>
                                    <div>{data.specialty}</div>
                                    <div>Working at <span className='font-bold'>{data.hospitalAffiliation}</span></div>
                                </div>
                            </div>

                        </div>
                        <div className='pt-18'>
                            <div className='flex justify-center font-bold text-2xl '>Conceltant Fee</div>
                            <div className='flex font-bold justify-center text-2xl'>
                                <div className='text-blue-700'><FaBangladeshiTakaSign /></div>
                                <div className='text-blue-700'>{data.Consultation_Fee}</div>
                            </div>
                            <div className='flex justify-center'>

                                <Link href={`/video/${data.channelName}`}>
                                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-full"><FaVideo />See Doctor Now</button>

                                </Link>



                            </div>
                            <div className='flex justify-center'>
                                <Link href={`/appointments/${data._id}`}><button className='bg-red-300 btn w-64 h-14 mt-2 rounded-4xl font-bold'>Appointments</button></Link>
                            </div>

                        </div>
                    </div>
                    <div className='pb-2 w-6/12 px-2'>
                        <div className='flex justify-between mt-4'>
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
                                <div className='flex'>
                                    <div className='font-bold'>{data.ratings}</div>
                                    <div className='pt-0.5 px-3'><IoStarHalfSharp /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-1'></div>
                <div className='flex gap-6 pt-3'>

                    <div className='hover:border-b-2 flex gap-1'>
                        <div className='pt-1'><BsInfoCircle /></div>
                        <button className="">Info</button>
                    </div>

                    <div className='hover:border-b-2 flex gap-1'>
                        <div className='pt-1'><IoBagAddOutline /></div>
                        <button className="">Exparicence</button>
                    </div>

                    <div className='hover:border-b-2 flex gap-1'>
                        <div className='pt-1'><MdOutlineReviews /></div>
                        <button className="">Reviews</button>
                    </div>
                </div>
            </div>

            <div className='flex gap-2'>
                <div className='shadow-base-300 bg-gray-200 rounded-2xl gap-1.5 w-6/12'>
                    <div className='flex gap-1.5 font-bold pt-5'>
                        <div className='pl-5'>About {data.title}</div>
                        <div>{data.firstName}</div>
                        <div>{data.lastName} :</div>
                    </div>
                    <div className='text-gray-700 pl-5'>{data.bio}</div>
                </div>

                <div className='p-5 shadow-base-300 bg-gray-200 rounded-2xl  w-6/12 '>
                    <div className=' font-bold'>Avilability</div>
                    <div className="border-l-2 border-blue-700 pl-4 py-2">
                        <div className="text-gray-700">Instant Consultation Time</div>
                        <div className="font-bold text-gray-900">{data.workingHours}</div>
                    </div>
                </div>

            </div>

        </div>
    );
}


