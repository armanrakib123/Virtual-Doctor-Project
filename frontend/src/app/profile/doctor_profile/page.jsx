"use client";
import Image from "next/image";
import { Calendar, Star, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DoctorProfile() {
  const { data: session, status } = useSession();



  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-base-100 border border-base-content/10 p-6 rounded-2xl shadow-md mb-8">
        <h1 className="text-3xl items-center flex justify-center font-bold text-base-content">Overview</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-base-100 border border-base-content/10 rounded-2xl shadow-md p-6 space-y-5 h-fit">
          <div className="w-full flex justify-center">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                width={200}
                height={200}
                alt="doctor image"
                className="rounded-2xl object-cover shadow"
              />
            ) : (
              <span>
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "U"}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-base-content">Dr. {session?.user?.name}</h2>
            <p className="text-base-content/70 mt-1">Internal Medicine • Cardiology</p>

            <div className="flex items-center gap-2 mt-3">
              <Star className="text-yellow-400" size={20} />
              <span className="font-semibold text-lg text-base-content">4.8</span>
              <span className="text-sm text-base-content/60">(38 reviews)</span>
            </div>
          </div>

          <div className="pt-4 space-y-3 text-sm text-base-content/80">
            <p className="flex items-center gap-2">
              <MapPin size={18} /> New York, Manhattan Health Associates
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} /> (212) 555 - 7890
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> {session?.user?.email}
            </p>
          </div>
          <div className="pt-4 border-t border-base-content/10">
            <h3 className="font-semibold mb-2 text-base-content">Languages</h3>
            <ul className="text-sm text-base-content/80 space-y-1">
              <li>• English (Native)</li>
              <li>• Spanish (Fluent)</li>
            </ul>
          </div>
        </div>


        <div className="lg:col-span-2 space-y-6">

          <div className="bg-base-100 border border-base-content/10 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-base-content">Dr. {session?.user?.name}</h3>

            <p className="text-base-content/80 leading-relaxed">
              Dr. Emily Chen is praised for professionalism, empathy, and clear explanations.
              Patients value her cardiology expertise and smooth booking experience.
            </p>


            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 rounded-xl bg-base-200">
                <p className="font-semibold text-lg text-base-content">4.63</p>
                <p className="text-xs text-base-content/60">Wait Time</p>
              </div>
              <div className="p-3 rounded-xl bg-base-200">
                <p className="font-semibold text-lg text-base-content">4.19</p>
                <p className="text-xs text-base-content/60">Bedside Manner</p>
              </div>
              <div className="p-3 rounded-xl bg-base-200">
                <p className="font-semibold text-lg text-base-content">4.74</p>
                <p className="text-xs text-base-content/60">Clear Explanations</p>
              </div>
            </div>
          </div>


          <div className="bg-base-100 border border-base-content/10 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-base-content">Top Patient Visit Reasons</h3>

            <div className="space-y-3 text-sm text-base-content/80">
              <div className="flex justify-between">
                <span>Hypertension Management</span> <span className="font-semibold">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Preventive Cardiology</span> <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>Heart Failure Monitoring</span> <span className="font-semibold">22%</span>
              </div>
              <div className="flex justify-between">
                <span>Chest Pain Evaluation</span> <span className="font-semibold">18%</span>
              </div>
            </div>
          </div>


          <div className="bg-base-100 border border-base-content/10 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-base-content">Professional Activities</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-base-content/80 mb-1">Clinical Practice (47%)</p>
                <div className="w-full h-3 bg-base-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[47%]"></div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-base-content/80 mb-1">Research (24%)</p>
                <div className="w-full h-3 bg-base-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[24%]"></div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-base-content/80 mb-1">Teaching (16%)</p>
                <div className="w-full h-3 bg-base-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[16%]"></div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-base-content/80 mb-1">Community Work (13%)</p>
                <div className="w-full h-3 bg-base-200 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[13%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
