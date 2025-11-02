"use client";
import React from "react";
import clsx from "clsx";
import { GradualSpacing } from "./GradualSpacing";
import Link from "next/link";



export default function MultiDirectionHero({
    bgImage1 = "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd",
    className = "",
}) {
    return (
        <section
            className={clsx("relative w-full overflow-hidden", className)}
            aria-label="Hero section"
        >

            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${bgImage1})`,
                }}
            />
            <div className="absolute inset-0 bg-black/10"></div>


            <header className="h-[600px]  ml-16 my-12">
                <div className="absolute inset-0 bg-black/55 -z-5" />
                <div className="relative flex justify-between">
                    <div className="pt-18">
                        <div className="flex items-center pb-12">
                            <div> <img className="w-7" src="/Assets/Gemini.png" alt="AI_lOGO" /></div>
                            <div className="font-bold">AI‑Powered Telemedicine</div>
                        </div>
                        <div className="text-black">
                            <div><GradualSpacing text="See a doctor anytime," as="h1" /></div>
                            <div><GradualSpacing text="anywhere" className="mb-6" as="h1" /></div>
                        </div>
                        <div className="font-bold text-gray-700 text-[18px]"><h1>Book instant appointments, consult over secure <br /> video, get digital prescriptions, and use AI <br /> symptom checker to triage faster.</h1></div>
                        <div className="flex items-center gap-6 pt-18">
                            <div>

                                
                                <Link href={"/all_doctors"}><button className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-900 py-1 pl-6 pr-14 font-medium text-neutral-50">
                                    <span className="z-10 font-bold pr-2">Book Appointment</span>
                                    <div className="absolute right-1 inline-flex h-11 w-11 items-center justify-end rounded-full bg-cyan-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                                        <div className="mr-3.5 flex items-center justify-center">
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-neutral-50"
                                            >
                                                <path
                                                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                                                    fill="currentColor"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </button></Link>


                            </div>
                            <div><button className="btn rounded-4xl px-8 py-3 bg-cyan-800 text-white font-bold">Sign Up Free</button></div>

                        </div>
                    </div>

                    <div className="w-5xl h-full">
                        <img className="" src="/Assets/HealthCare.gif" alt="GiftImage" />
                    </div>
                </div>



            </header>
        </section>
    );
}
