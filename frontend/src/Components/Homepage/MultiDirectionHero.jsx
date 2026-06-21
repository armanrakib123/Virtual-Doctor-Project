"use client";
import React from "react";
import clsx from "clsx";
import { GradualSpacing } from "./GradualSpacing";
import Link from "next/link";

export default function MultiDirectionHero({
    bgImage1 = "/Assets/A.jpg",
    className = "",
}) {
    return (
        <section
            className={clsx("relative w-full overflow-hidden", className)}
            aria-label="Hero section"
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${bgImage1})` }}
            />
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Content */}
            <header className="relative min-h-[600px] px-6 lg:px-16 py-12">
                <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

                    {/* TEXT SECTION */}
                    <div className="w-full lg:w-1/2 pt-6 lg:pt-18">
                        <div className="flex items-center gap-2 pb-6">
                            <img className="w-7" src="/Assets/Gemini.png" alt="AI_LOGO" />
                            <span className="font-bold text-base-700">
                                AI-Powered Telemedicine
                            </span>
                        </div>

                        <div className="text-base-500">
                            <GradualSpacing text="See a doctor anytime," as="h1" />
                            <GradualSpacing text="anywhere" as="h1" className="mb-4" />
                        </div>

                        <p className="font-semibold text-base-500 text-[16px] lg:text-[18px] leading-relaxed">
                            Book instant appointments, consult over secure video,
                            get digital prescriptions, and use AI symptom checker
                            to triage faster.
                        </p>

                        <div className="flex gap-6 pt-8">
                            <Link href="/all_doctors">
                                <button className="group relative inline-flex h-[56px] items-center justify-center rounded-full bg-neutral-900 py-1 pl-6 pr-14 font-medium text-neutral-50">
                                    <span className="z-10 font-bold pr-2">
                                        Book Appointment
                                    </span>
                                    <div className="absolute right-1 inline-flex h-11 w-11 items-center justify-end rounded-full bg-cyan-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                                        <div className="mr-3.5 flex items-center justify-center">
                                            ➜
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-5xl h-full sm:w-4xl">
                        <img className="" src="/Assets/HealthCare.gif" alt="GiftImage" />
                    </div>

                </div>
            </header>
        </section>
    );
}
