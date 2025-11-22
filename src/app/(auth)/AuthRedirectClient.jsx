// app/(auth)/AuthRedirectClient.jsx  (example)
"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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










// app/doctor/dashboard/page.jsx (server component)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // export করলে ইমপোর্ট করো

export default async function DoctorDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to signin
    return redirect("/auth/signin");
  }
  if (session.user.role !== "doctor") {
    // forbidden or redirect to patient dashboard
    return redirect("/patient/dashboard");
  }

  // doctor নিলে এখানে doc dashboard রেন্ডার করো
  return <div>Doctor Dashboard — Welcome {session.user.name}</div>;
}

