'use client';
import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../../admin_context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-base-300 dark:border-base-content/10 bg-base-100 rounded-xl max-w-56 overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all' key={index}>
            <img className='bg-base-200 group-hover:bg-primary/20 transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-base-content text-lg font-medium'>{item.name}</p>
              <p className='text-base-content/70 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm text-base-content'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} className="checkbox checkbox-sm checkbox-primary" />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default DoctorsList;
