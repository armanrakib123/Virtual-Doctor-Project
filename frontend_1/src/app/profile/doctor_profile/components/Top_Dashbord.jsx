"use client"; 
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Top_Dashbord() {

    const { data: session, status } = useSession();

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Dr. {session?.user?.name}</h1>
                <p className="text-gray-600 mb-8">Below are your activities for today.</p>
            </div>
        </div>
    )
}
