"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export default function AuthRedirectClient({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    const role = session?.user?.role || "patient";
    if (role === "doctor") {
      router.push("/doctor/dashboard");
    } else {
      router.push("/patient/dashboard");
    }
  }, [status, session, router]);

  return <>{children}</>;
}




export default async function DoctorDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
  
    return redirect("/auth/signin");
  }
  if (session.user.role !== "doctor") {
 
    return redirect("/patient/dashboard");
  }

  return <div>Doctor Dashboard — Welcome {session.user.name}</div>;
}

