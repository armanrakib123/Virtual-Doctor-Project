"use client"; 
import { useSession } from 'next-auth/react';
import React from 'react';
import ThemeToggle from '@/Components/layout/ThemeToggle';

export default function Top_Dashbord() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between pb-4">
      <div>
        <h1 className="text-3xl font-bold text-base-content mb-2">Welcome, Dr. {session?.user?.name || "Doctor"}</h1>
        <p className="text-base-content/70">Below are your activities for today.</p>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
