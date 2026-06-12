import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" ? true : false ,
  });

  if (token) {
    return NextResponse.next();
  } else {
    
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/Login/patient";
    
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
};

export const config = {
  matcher: [
    "/appointments",
    "/My_Bookings",
    "/appointments/:path*",
    "/My_Bookings/:path*",
    "/profile/patient_profile/:path*",
    "/profile/doctor_profile/:path*",
  ],
};
