"use client";

import React, { useState } from "react";
import styles from "./login-component-2.module.css";
import clsx from "clsx";
import Link from "next/link";

export default function Page() {

////////////////// { register API } //////////////////////////


  const handle_register_submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) { 
      alert("User registered successfully!");
      form.reset();
    } else {
      alert(data.error);
    }
  };


////////////////// { login API } //////////////////////////




//////////////////////////////////////////////////////////

  const [animation, setAnimation] = useState("");

  const handleSignUpClick = () => {
    setAnimation("animated-signin");
  };

  const handleSignInClick = () => {
    setAnimation("animated-signup");
  };

  return (
    <div className={`${styles.baseFontSize}`}>
      <div className={`${styles.localWrapper}`}>


        <div className="bg-gradient-to-r from-[#037aa5] to-[var(--mainColor)] font-normal min-h-screen  place-content-center overflow-hidden">

          <div className="pl-16">
            <Link href="/" className="flex gap-1 btn-ghost text-xl">
              <div className='w-12'><img src="/Assets/Stethoscope.png" alt="Stethoscope_icon" /></div>
              <span className="font-bold text-3xl">Virtual<span className="text-cyan-500">Doc</span></span>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className={`relative w-[30rem] sm:w-[40rem] h-[50rem] ${animation}`}>



              {/*//////////////////////// Sign UP   //////////////////////////////////// */}



              <div className={clsx(`${styles.formContainer} `,
                {
                  [styles.animatedSignInOnSignUpCard]: animation == "animated-signin",
                  [styles.animatedSignUpOnSignUpCard]: animation == "animated-signup",
                })}>

                <form onSubmit={handle_register_submit} action="#">
                  <h2 className={`${styles.cardTitle}`}>sign up</h2>

                  <div className={`${styles.formGroup}`}>
                    <input
                      type="text"
                      name="name"
                      required
                      className={`${styles.inputFields}`}
                    />

                    <label className={`${styles.fieldLabel}`}>username</label>
                  </div>

                  <div className={`${styles.formGroup}`}>
                    <input
                      type="text"
                      name="email"
                      required
                      className={`${styles.inputFields}`}
                    />

                    <label className={`${styles.fieldLabel}`}>email</label>
                  </div>

                  <div className={`${styles.formGroup}`}>
                    <input
                      type="password"
                      name="password"
                      required
                      className={`${styles.inputFields}`}
                    />

                    <label className={`${styles.fieldLabel}`}>password</label>
                  </div>









                  <button type="submit" className={`${styles.buttons}`}>
                    sign up
                  </button>


                  <div>
                    <div className="font-bold justify-center flex pt-5 text-gray-600 text-[15px]" >Or continue with

                    </div>

                    <div className="flex justify-center gap-8 pt-2">
                      <button className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                      </button>


                      <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
                        <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
                        Login with Facebook
                      </button>
                    </div>
                  </div>


                  <div className={`text-center text-[1.4rem] text-[var(--labelColor)] my-8`}>
                    <p>
                      You already have an account?
                      <a
                        href="#"
                        className="capitalize text-[var(--mainColor)] no-underline font-semibold transition-all duration-500 ease-in-out hover:text-[#da4453]"
                        onClick={handleSignInClick}
                      >
                        {" "}
                        Login
                      </a>
                    </p>
                  </div>
                </form>
              </div>


              {/* /////////////////////////////    Log in     //////////////////////////////////// */}



              <div className={clsx(`${styles.formContainer} form-container sign-in`,
                {
                  [styles.animatedSignInOnSignInCard]: animation == "animated-signin",
                  [styles.animatedSignUpOnSignInCard]: animation == "animated-signup",
                })}>

                <form action="#">
                  <h2 className={`${styles.cardTitle}`}>login</h2>

                  <div className={`${styles.formGroup} form-group`}>
                    <input
                      type="text"
                      required
                      className={`${styles.inputFields}`}
                    />

                    <label className={`${styles.fieldLabel}`}>username</label>
                  </div>

                  <div className={`${styles.formGroup} form-group`}>
                    <input
                      type="password"
                      required
                      className={`${styles.inputFields}`}
                    />

                    <label className={`${styles.fieldLabel}`}>password</label>
                  </div>

                  <div className="forgot-pass my-6 -mt-6">
                    <a
                      href="#"
                      className="text-[var(--labelColor)] no-underline text-[1.4rem] capitalize transition-all duration-500 ease-in-out hover:text-[var(--mainColor)]"
                    >
                      forgot password?
                    </a>
                  </div>

                  <button type="submit" className={`${styles.buttons} btn`}>
                    login
                  </button>

                  <div>
                    <div className="font-bold justify-center flex pt-5 text-gray-600 text-[15px]" >Or continue with

                    </div>

                    <div className="flex justify-center gap-8 pt-2">
                      <button className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                      </button>


                      <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
                        <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
                        Login with Facebook
                      </button>
                    </div>
                  </div>

                  <div className={`link text-center text-[1.4rem] text-[var(--labelColor)] my-10`}>
                    <p>
                      Don&apos;t have an account?
                      <a
                        href="#"
                        className="signup-link capitalize text-[var(--mainColor)] no-underline font-semibold transition-all duration-500 ease-in-out hover:text-[#da4453]"
                        onClick={handleSignUpClick}
                      >
                        {" "}
                        sign up
                      </a>
                    </p>
                  </div>
                </form>

              </div>



              {/* /////////////////////////////////////////////////////////////////////////////// */}



            </div>
          </div>
        </div>
      </div>

    </div >
  );
}
