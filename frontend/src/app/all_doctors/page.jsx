import DoctorDirectory from './Components/All_Doctor';

export default async function All_Doctor() {
  let data = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor`, { cache: "no-store" });
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
  }

  data = data.map(d => ({
    ...d,
    _id: d._id ? d._id.toString() : (d.id ? d.id.toString() : Math.random().toString()),
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
