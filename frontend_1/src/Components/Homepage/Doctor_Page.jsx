// import React from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaCalendarAlt, FaUserMd, FaComments, FaHeart } from 'react-icons/fa';
// import Image from 'next/image';


// const MOCK_DOCTORS = [
//   { name: 'Dr. Bob Brown', specialty: 'General Dentist', description: 'Glavi lorem ipsum dolor sit amet, consectetur adipiscing elit.', imageUrl: 'https://images.unsplash.com/photo-1582759146199-0d2d380f74af?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//   { name: 'Dr. Mary Smith', specialty: 'General Dentist', description: 'Glavi lorem ipsum dolor sit amet, consectetur adipiscing elit.', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48f8b06878df?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//   { name: 'Dr. Nick Dark', specialty: 'Orthodontist', description: 'Glavi lorem ipsum dolor sit amet, consectetur adipiscing elit.', imageUrl: 'https://images.unsplash.com/photo-1550831110-8f9f59f99583?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//   { name: 'Dr. May Dowson', specialty: 'Endodontist', description: 'Ut fringilla purus eros quis glavida euismod.', imageUrl: 'https://images.unsplash.com/photo-1594824485773-40e8e6b22558?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//   { name: 'Dr. Betty Nilsson', specialty: 'Pediatric Dentist', description: 'Ut fringilla purus eros quis glavida euismod.', imageUrl: 'https://images.unsplash.com/photo-1622253692010-337f4ce40d49?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//   { name: 'Dr. Adrian Scold', specialty: 'Orthodontist', description: 'Ut fringilla purus eros quis glavida euismod.', imageUrl: 'https://images.unsplash.com/photo-1636881768436-120520a01217?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
// ];

// const WORKING_PROCESS_STEPS = [
//   { icon: <FaCalendarAlt className="text-4xl text-white" />, title: 'Appointment', description: 'Sample text. Click to select the first Element.' },
//   { icon: <FaUserMd className="text-4xl text-white" />, title: 'Expert Doctor', description: 'Sample text. Click to select the first Element.' },
//   { icon: <FaComments className="text-4xl text-white" />, title: 'Consultation', description: 'Sample text. Click to select the first Element.' },
//   { icon: <FaHeart className="text-4xl text-white" />, title: 'Enjoy Life', description: 'Sample text. Click to select the first Element.' },
// ];

// // --- Components ---

// const TeamBanner = () => (
//   <header className="w-full h-[400px] relative overflow-hidden">
//     {/* <Image
//       src="https://images.unsplash.com/photo-1550831110-8f9f59f99583?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//       alt="A diverse team of doctors and medical staff smiling."
//       fill
//       style={{ objectFit: 'cover' }}
//       priority 
//     /> */}
//   </header>
// );

// const DoctorCard = ({ doctor }) => (
//   <div className="card w-full bg-base-100 shadow-xl p-4 transition duration-300 hover:shadow-2xl">
//     <figure className="px-4 pt-4">
//       <div className="avatar w-full">
//         <div className="w-32 h-32 rounded-full mx-auto overflow-hidden relative">
//           {/* <Image
//             src={doctor.imageUrl}
//             alt={`${doctor.name} - ${doctor.specialty}`}
//             fill
//             style={{ objectFit: 'cover' }}
//           /> */}
//         </div>
//       </div>
//     </figure>
//     <div className="card-body items-center text-center p-4">
//       <h2 className="card-title text-xl font-bold text-gray-800">{doctor.name}</h2>
//       <p className="text-lg font-semibold text-primary">{doctor.specialty}</p>
//       <p className="text-sm text-gray-500 my-2">{doctor.description}</p>
//       <div className="card-actions justify-center space-x-3 mt-3">
//         {/* DaisyUI button group for social icons */}
//         <button className="btn btn-circle btn-sm btn-outline text-primary/60 hover:text-white hover:bg-primary border-primary/60 hover:border-primary">
//           <FaFacebookF />
//         </button>
//         <button className="btn btn-circle btn-sm btn-outline text-primary/60 hover:text-white hover:bg-primary border-primary/60 hover:border-primary">
//           <FaTwitter />
//         </button>
//         <button className="btn btn-circle btn-sm btn-outline text-primary/60 hover:text-white hover:bg-primary border-primary/60 hover:border-primary">
//           <FaInstagram />
//         </button>
//       </div>
//     </div>
//   </div>
// );


// const DoctorsSection = () => (
//   <section className="py-16 md:py-24 bg-gray-50">
//     <div className="container mx-auto px-4 max-w-7xl">
//       {/* Title Block */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
//           Our Doctors
//         </h1>
//         <p className="text-gray-500 max-w-2xl mx-auto">
//           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//         </p>
//       </div>

//       {/* Doctors Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {MOCK_DOCTORS.map((doctor, index) => (
//           <DoctorCard key={index} doctor={doctor} />
//         ))}
//       </div>
      
//       {/* Footer text from the original design */}
//       <div className="text-center mt-12 text-xs text-gray-400">
//         Images from Freepik
//       </div>
//     </div>
//   </section>
// );


// const ProcessStepCard = ({ step }) => (
//   <div className="text-center p-6 flex flex-col items-center">
//     {/* Icon Wrapper (mimicking the circular container) */}
//     <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full border-2 border-white/50 p-1">
//         <div className="bg-white/20 p-4 rounded-full">
//             {step.icon}
//         </div>
//     </div>
//     <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
//     <p className="text-white/80 text-sm">{step.description}</p>
//   </div>
// );


// const WorkingProcessSection = () => (
//   // Custom teal color: bg-[#5fbfa2] for high visual fidelity
//   <section className="py-16 md:py-24 bg-[#5fbfa2]"> 
//     <div className="container mx-auto px-4 max-w-7xl">
//       {/* Title Block */}
//       <div className="text-center mb-12">
//         <p className="text-white/80 text-sm tracking-widest uppercase">Working Process</p>
//         <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
//           How We Work?
//         </h2>
//         <p className="text-white/70 max-w-2xl mx-auto mt-4 text-sm">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//         </p>
//       </div>

//       {/* Process Steps Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
//         {WORKING_PROCESS_STEPS.map((step, index) => (
//           <ProcessStepCard key={index} step={step} />
//         ))}
//       </div>
//     </div>
//   </section>
// );


// export default function Doctor_Page() {
//   return (
//     <div className="min-h-screen bg-white">
//       <main>
//         {/* 1. Top Banner */}
//         <TeamBanner />

//         {/* 2. Our Doctors Section */}
//         <DoctorsSection />

//         {/* 3. Working Process Section */}
//         <WorkingProcessSection />
//       </main>
//     </div>
//   )
// }
