"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdDelete } from 'react-icons/md'

export default function DeleteBooking({id, email}) {
    const router = useRouter();
    const handleDelete = async (id) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointment_Update/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );
        const data = await res.json();
        console.log(data);
        router.refresh();
    };
    return (
        <div>
            <MdDelete onClick={() => handleDelete(id)} className="h-8 w-8 font-bold"></MdDelete>
        </div>
    )
}
