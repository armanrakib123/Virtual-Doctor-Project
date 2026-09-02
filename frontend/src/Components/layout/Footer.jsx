
import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300 text-base-content">
      
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition duration-300 hover:opacity-80"
            >
              <div className="w-12">
                <img
                  src="/Assets/Stethoscope.png"
                  alt="VirtualDoc Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-3xl font-bold">
                Virtual
                <span className="text-cyan-600">Doc</span>
              </span>
            </Link>

            <p className="mt-6 max-w-md leading-7 opacity-70">
              VirtualDoc is a modern digital healthcare platform designed to
              connect patients with trusted doctors anytime and anywhere.
              Experience smarter, faster, and more accessible healthcare.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaTwitter />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaGithub />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title text-base font-bold uppercase tracking-wider">
              Quick Links
            </h6>

            <Link href="/" className="link link-hover">
              Home
            </Link>

            <Link href="/doctors" className="link link-hover">
              Find Doctors
            </Link>

            <Link href="/appointments" className="link link-hover">
              Appointments
            </Link>

            <Link href="/about" className="link link-hover">
              About Us
            </Link>

            <Link href="/contact" className="link link-hover">
              Contact
            </Link>
          </nav>

          {/* Services */}
          <nav>
            <h6 className="footer-title text-base font-bold uppercase tracking-wider">
              Services
            </h6>

            <Link href="/doctors" className="link link-hover">
              Online Consultation
            </Link>

            <Link href="/appointments" className="link link-hover">
              Book Appointment
            </Link>

            <Link href="/medical-records" className="link link-hover">
              Medical Records
            </Link>

            <Link href="/chat" className="link link-hover">
              Doctor Chat
            </Link>

            <Link href="/emergency" className="link link-hover">
              Emergency Support
            </Link>
          </nav>

          {/* Resources */}
          <nav>
            <h6 className="footer-title text-base font-bold uppercase tracking-wider">
              Resources
            </h6>

            <Link href="/blog" className="link link-hover">
              Health Blog
            </Link>

            <Link href="/faq" className="link link-hover">
              FAQ
            </Link>

            <Link href="/help" className="link link-hover">
              Help Center
            </Link>

            <Link href="/privacy-policy" className="link link-hover">
              Privacy Policy
            </Link>

            <Link href="/terms-and-conditions" className="link link-hover">
              Terms & Conditions
            </Link>
          </nav>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-base-content/10" />

      {/* Bottom Footer */}
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">

        <p className="text-center text-sm opacity-70 md:text-left">
          © {currentYear}{" "}
          <span className="font-semibold text-cyan-600">
            VirtualDoc
          </span>
          . All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm">

          <Link
            href="/privacy-policy"
            className="transition hover:text-cyan-600"
          >
            Privacy
          </Link>

          <Link
            href="/terms-and-conditions"
            className="transition hover:text-cyan-600"
          >
            Terms
          </Link>

          <Link
            href="/cookies"
            className="transition hover:text-cyan-600"
          >
            Cookies
          </Link>

        </div>

      </div>

    </footer>
  );
}

