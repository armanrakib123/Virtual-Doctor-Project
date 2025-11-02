import dbconnect, { collectionNameObj } from '@/lib/dbconnect';
import { ObjectId } from 'mongodb';
import React from 'react'

export default async function DoctorDetaislPage({ params }) {

  const Doctor = await params;
  const DoctorDetailsCollection = dbconnect(collectionNameObj.All_Doctor_Collection)
  const data = await DoctorDetailsCollection.findOne({ _id: new ObjectId(Doctor._id) })

  return (
    <div className='mt-28'>
      <img src={data.profilePicture} alt="Doctor_Image"/>
      <div>
        {data.bio}
      </div>
    </div>
  )
}
