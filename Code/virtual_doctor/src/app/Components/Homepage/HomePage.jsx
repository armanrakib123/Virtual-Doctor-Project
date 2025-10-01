"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MultiDirectionHero from "./MultiDirectionHero";
import { MultiDirectionSlide } from "./MultiDirectionSlide";
import ServiceCard from "./ServiceCard";



export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <div className="min-h-screen text-base-content">
      <header>
        <main>
          <MultiDirectionHero
            bgImage="/Assets/A.jpg"
          />
        </main>
      </header>

      <section className="bg-gray-100 pt-12 pb-12">
        <div>
          <MultiDirectionSlide
            className="font-display text-center text-4xl font-bold -tracking-widest  text-black dark:text-black md:text-7xl md:leading-[5rem]"
            textLeft="Everything you need to consult online"
            textRight="From quick booking to AI triage and digital prescriptions—built for speed & safety."
          />
        </div>

        <div>
          <ServiceCard></ServiceCard>
        </div>

      </section>

      <main className="max-w-8xl mx-auto px-12 py-8">
        <section id="home" className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Doctors Who Listen</h1>
            <p className="mt-4 w-2/3 text-lg text-muted-foreground">Our doctors spend time to get to know you and your health. They treat you with the respect and empathy you deserve and have years of local and international experience to give you advice you can rely on.</p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="100">
                <h3 className="font-semibold">First</h3>
                <p className="text-sm text-muted-foreground">Optimized for performance</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="300">
                <h3 className="font-semibold">Second</h3>
                <p className="text-sm text-muted-foreground">Built with accessibility in mind</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src="/Assets/Why.webp" alt="hero" className="w-full h-[500px] object-cover" />
            </div>
            {/* <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-xl w-64" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60" alt="avatar" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Jane Doe</div>
                  <div className="text-sm text-muted-foreground">Product Designer</div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

      </main>

      <section id="features" className=" max-w-8xl mx-auto px-12 py-8 bg-gray-200">
        {/* <h2 className="text-3xl font-bold" data-aos="fade-up">Features</h2> */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img src="/Assets/Lab.webp" alt="Lab_test" className="rounded-xl shadow-lg w-full h-[500px] object-cover" />
          </div>

          <div>
            <div data-aos="fade-left">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Diagnosis You Can Trust</h1>
              <p className="mt-4 w-2/3 text-lg text-muted-foreground">You can depend on the quality of our diagnosis and test results. Our laboratories are set up according to international standards and protocols and Praava's diagnostic lab is one of six internationally accredited labs in Bangladesh.</p>

            </div>
            <div className="pt-8">
              <h2 className="btn text-white font-bold bg-cyan-800 w-40 flex justify-center items-center h-12" data-aos="fade-up">Our Services</h2>
            </div>
          </div>

          {/* <div data-aos="fade-left" className="flex flex-col justify-center gap-6">
              <div>
                <h3 className="text-xl font-semibold">Animations that delight</h3>
                <p className="text-muted-foreground mt-2">Using AOS you can add subtle scroll-based animations that don't get in the way of content.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow" data-aos="fade-up" data-aos-delay="100">
                  <h4 className="font-semibold">Fade & Slide</h4>
                  <p className="text-sm text-muted-foreground">Element fades and slides into view.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow" data-aos="fade-up" data-aos-delay="200">
                  <h4 className="font-semibold">Zoom & Flip</h4>
                  <p className="text-sm text-muted-foreground">Attention grabbing micro-interactions.</p>
                </div>
              </div>
            </div> */}
        </div>
      </section>

      <main className="max-w-8xl mx-auto px-12 py-8">
        <section id="home" className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Healthcare Anytime, Anywhere</h1>
            <p className="mt-4 w-2/3 text-lg text-muted-foreground">We use technology to make healthcare accessible to you no matter where you are. You can access your health data, book appointments, review your prescriptions, and view your medical records, anywhere at your convenience.</p>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src="/Assets/Care.webp" alt="hero" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </section>
      </main>









      <main className="max-w-8xl mx-auto px-6 py-16">
        {/* HERO */}
        {/* <section id="home" className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Build beautiful web experiences with <span className="text-primary">Next.js</span></h1>
            <p className="mt-4 text-lg text-muted-foreground">Fast, accessible and delightful UI using Tailwind CSS + DaisyUI + AOS animations. Ready for production and easy to customize.</p>

            <div className="mt-6 flex gap-3">
              <a href="#contact" className="btn btn-primary btn-lg">Start a Project</a>
              <a href="#features" className="btn btn-ghost btn-lg">Explore Features</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="100">
                <h3 className="font-semibold">Fast</h3>
                <p className="text-sm text-muted-foreground">Optimized for performance</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="200">
                <h3 className="font-semibold">Responsive</h3>
                <p className="text-sm text-muted-foreground">Looks great on any device</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="300">
                <h3 className="font-semibold">Accessible</h3>
                <p className="text-sm text-muted-foreground">Built with accessibility in mind</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=60" alt="hero" className="w-full h-72 object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-xl w-64" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60" alt="avatar" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Jane Doe</div>
                  <div className="text-sm text-muted-foreground">Product Designer</div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* SERVICES */}
        {/* <section id="services" className="mt-20">
          <h2 className="text-3xl font-bold" data-aos="fade-up">Services</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl" data-aos="fade-up" data-aos-delay="100">We craft production-ready websites with attention to performance, accessibility and delightful UI.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Design System", desc: "Reusable components & tokens", delay: 150 },
              { title: "Web Development", desc: "Next.js + Tailwind implementations", delay: 250 },
              { title: "Performance", desc: "Optimization & best practices", delay: 350 },
            ].map((s, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay={s.delay}>
                <div className="text-3xl mb-4">✨</div>
                <h3 className="font-semibold text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4">
                  <button className="btn btn-sm btn-outline">Learn more</button>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* FEATURES */}
        {/* <section id="features" className="mt-20">
          <h2 className="text-3xl font-bold" data-aos="fade-up">Features</h2>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div data-aos="fade-right">
              <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60" alt="feature" className="rounded-xl shadow-lg w-full h-72 object-cover" />
            </div>

            <div data-aos="fade-left" className="flex flex-col justify-center gap-6">
              <div>
                <h3 className="text-xl font-semibold">Animations that delight</h3>
                <p className="text-muted-foreground mt-2">Using AOS you can add subtle scroll-based animations that don't get in the way of content.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow" data-aos="fade-up" data-aos-delay="100">
                  <h4 className="font-semibold">Fade & Slide</h4>
                  <p className="text-sm text-muted-foreground">Element fades and slides into view.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow" data-aos="fade-up" data-aos-delay="200">
                  <h4 className="font-semibold">Zoom & Flip</h4>
                  <p className="text-sm text-muted-foreground">Attention grabbing micro-interactions.</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* TESTIMONIALS */}
        {/* <section id="testimonials" className="mt-20">
          <h2 className="text-3xl font-bold" data-aos="fade-up">What clients say</h2>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {[
              { name: "Rahim", text: "Ignored the competition—our bounce rate dropped 40%", role: "CTO" },
              { name: "Karim", text: "Beautiful UI and lightning fast pages.", role: "Founder" },
            ].map((t, i) => (
              <blockquote key={i} className="p-6 bg-white rounded-xl shadow" data-aos="zoom-in" data-aos-delay={i * 150}>
                <p className="text-lg">“{t.text}”</p>
                <footer className="mt-4 text-sm text-muted-foreground">— {t.name}, {t.role}</footer>
              </blockquote>
            ))}
          </div>
        </section> */}

        {/* CONTACT */}
        {/* <section id="contact" className="mt-20">
          <h2 className="text-3xl font-bold" data-aos="fade-up">Get in touch</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <form data-aos="fade-right" className="bg-white p-6 rounded-xl shadow">
              <div className="grid grid-cols-1 gap-4">
                <input className="input input-bordered w-full" placeholder="Full name" />
                <input className="input input-bordered w-full" placeholder="Email" />
                <textarea className="textarea textarea-bordered w-full" placeholder="Your message" rows={5}></textarea>
                <div className="flex items-center justify-end">
                  <button type="submit" className="btn btn-primary">Send message</button>
                </div>
              </div>
            </form>

            <div data-aos="fade-left" className="space-y-4">
              <div className="p-6 bg-white rounded-xl shadow flex items-start gap-4">
                <div className="text-2xl text-primary"><FiPhone /></div>
                <div>
                  <div className="font-semibold">Call us</div>
                  <div className="text-sm text-muted-foreground">+88 0123 456 789</div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow flex items-start gap-4">
                <div className="text-2xl text-primary"><FiMail /></div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground">hello@yourbrand.com</div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow flex items-start gap-4">
                <div className="text-2xl text-primary"><FiMapPin /></div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-sm text-muted-foreground">Dhaka, Bangladesh</div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* FOOTER */}
      </main>
    </div>
  );
}
