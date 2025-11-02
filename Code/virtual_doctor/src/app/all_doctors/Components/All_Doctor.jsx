import dbconnect, { collectionNameObj } from '@/lib/dbconnect'
import Link from 'next/link';
import React from 'react'

export default async function All_Doctor() {
    const Doctors = dbconnect(collectionNameObj.All_Doctor_Collection);
    const data = await Doctors.find({}).toArray();

    return (
        <div className='grid grid-cols-12'>
            {data.map((item) => {
                return (
                    <div className='lg:col-span-3 px-8 py-8' key={item._id}>
                        <Link href={`/doctor_details/${item._id}`}>
                            <div>
                                <div>
                                    <img
                                        src={item.profilePicture}
                                        alt="Doctor image"
                                        width={314}
                                        height={208}
                                    />
                                </div>
                                <div className='flex'>
                                    <h1>{item.title}</h1>
                                    <h2>{item.firstName}</h2>
                                </div>
                                <div>
                                    <h1>{item.specialty}</h1>
                                </div>
                                <div className='flex gap-24'>
                                    <h1 className='text-red-500 font-bold'>{item.price}</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
