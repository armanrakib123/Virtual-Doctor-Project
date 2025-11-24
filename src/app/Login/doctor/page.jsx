// app/Login/doctor/page.jsx
"use client";

import React, { useState } from "react";
import styles from "./login-component-2.module.css";
import clsx from "clsx";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Social_Login_Register from "./Components/Social_Login_Register";

export default function Page() {

  const [showPassword, setShowPassword] = useState(false);

  ////////////////// { register API } //////////////////////////


  const handle_register_submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;


    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be min 6 chars, include uppercase, lowercase, number & special character (!@#$%)."
      );
      return;
    }


    const res = await fetch("/api/register_doctor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("User registered successfully!");
      // form.reset();
    } else {
      alert(data.error);
    }
  };


  ////////////////// { login API } //////////////////////////
  // const params = useSearchParams();
  // const callbackUrl = params.get("callbackUrl") || "/";
  // const router = useRouter();


  const handle_login_submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const response = signIn("doctor-login", {
        email,
        password,
        redirect: false,
      });

      if (response.ok) {
        toast.success("Logged in successfully")
        router.push(callbackUrl);
        // form.reset();
      }
    } catch (error) {
      toast.error("Failed to login")
    }
  };



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

                  <div className={styles.formGroup} style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      className={styles.inputFields}
                    />

                    <label className={styles.fieldLabel}>Password</label>

                    {/* Eye icon */}
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>









                  <button type="submit" className={`${styles.buttons}`}>
                    sign up
                  </button>


                  <div>
                    <div className="font-bold justify-center flex pt-5 text-gray-600 text-[15px]" >Or continue with

                    </div>

                    <Social_Login_Register></Social_Login_Register>
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

                <form onSubmit={handle_login_submit} action="#">
                  <h2 className={`${styles.cardTitle}`}>login</h2>

                  <div className={`${styles.formGroup}`}>
                    <input
                      type="text"
                      name="email"
                      required
                      className={`${styles.inputFields}`}
                    />

                    <label className={`${styles.fieldLabel}`}>email</label>
                  </div>

                  <div className={styles.formGroup} style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      className={styles.inputFields}
                    />

                    <label className={styles.fieldLabel}>Password</label>

                    {/* Eye icon */}
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
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
                    <Social_Login_Register></Social_Login_Register>
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
