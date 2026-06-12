"use client";
import { useContext, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Loading';

const Doctors = () => {
    const params = useParams();
    const specialty = params?.specialty || null;

    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const { doctors } = useContext(AppContext);
    const router = useRouter();

    const applyFilter = () => {
        if (specialty) {
            setFilterDoc(
                doctors.filter(
                    (doc) =>
                        doc.speciality.toLowerCase().trim() ===
                        specialty.toLowerCase().trim()
                )
            );
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, specialty]);

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>

            <button
                className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''
                    }`}
                onClick={() => {
                    setShowFilter((prev) => !prev);
                }}
            >
                Filters
            </button>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <div
                    className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'
                        }`}
                >
                    <p
                        onClick={() =>
                            specialty === 'General physician'
                                ? router.push('/doctors')
                                : router.push('/doctors/General physician')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === 'General physician'
                                ? 'bg-indigo-100 text-black'
                                : ''
                            }`}
                    >
                        General physician
                    </p>

                    <p
                        onClick={() =>
                            specialty === 'Gynecologist'
                                ? router.push('/doctors')
                                : router.push('/doctors/Gynecologist')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === 'Gynecologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                            }`}
                    >
                        Gynecologist
                    </p>

                    <p
                        onClick={() =>
                            specialty === 'Dermatology'
                                ? router.push('/doctors')
                                : router.push('/doctors/Dermatology')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === 'Dermatologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                            }`}
                    >
                        Dermatologist
                    </p>

                    <p
                        onClick={() =>
                            specialty === 'Pediatricians'
                                ? router.push('/doctors')
                                : router.push('/doctors/Pediatricians')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === 'Pediatricians'
                                ? 'bg-indigo-100 text-black'
                                : ''
                            }`}
                    >
                        Pediatricians
                    </p>

                    <p
                        onClick={() =>
                            specialty === 'Neurologist'
                                ? router.push('/doctors')
                                : router.push('/doctors/Neurologist')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === 'Neurologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                            }`}
                    >
                        Neurologist
                    </p>

                    <p
                        onClick={() =>
                            specialty === 'Gastroenterologist'
                                ? router.push('/doctors')
                                : router.push('/doctors/Gastroenterologist')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty === 'Gastroenterologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                            }`}
                    >
                        Gastroenterologist
                    </p>
                </div>

                {doctors.length !== 0 ? (
                    <>
                        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                            {filterDoc.map((item, index) => (
                                <div
                                    onClick={() => {
                                        router.push(`/appointment/${item._id}`);
                                    }}
                                    className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                                    key={index}
                                >
                                    <img className='bg-blue-50' src={item.image} alt="doctor" />
                                    <div className='p-4'>
                                        <div
                                            className={`flex items-center gap-2 text-sm text-center ${item.available
                                                    ? 'text-green-500'
                                                    : 'text-gray-500'
                                                }`}
                                        >
                                            <p
                                                className={`w-2 h-2 ${item.available
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-500'
                                                    } rounded-full`}
                                            ></p>
                                            <p>
                                                {item.available
                                                    ? 'Available'
                                                    : 'Not Available'}
                                            </p>
                                        </div>
                                        <p className='text-gray-900 text-lg font-medium'>
                                            {item.name}
                                        </p>
                                        <p className='text-gray-600 text-sm'>
                                            {item.speciality}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='w-full flex justify-center items-center'>
                        <Loading text="Loading all doctors..." />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctors;
