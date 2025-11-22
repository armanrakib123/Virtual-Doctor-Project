
import dbconnect, { collectionNameObj } from '@/lib/dbconnect'
import DoctorDirectory from './Components/All_Doctor';


export default async function All_Doctor() {
  const Doctors = dbconnect(collectionNameObj.All_Doctor_Collection);
  let data = await Doctors.find({}).toArray();
  data = data.map(d => ({
    ...d,
    _id: d._id.toString(),
    Consultation_Fee: Number(d.Consultation_Fee) || 0,
    yearsOfExperience: Number(d.yearsOfExperience) || 0,
    ratings: Number(d.ratings) || 0,
  }));

  return (
    <div className='mt-28'>
      <div className="relative h-96 w-full mt-28">
        <img
          src="/Assets/AllDoc.jpg"
          alt="Doctor banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Find the Best Doctors Near You
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl drop-shadow-lg">
            Book appointments with top-rated, experienced doctors in just a few clicks.
          </p>
        </div>
      </div>
      <DoctorDirectory doctors={data} />
    </div>
  )
}
