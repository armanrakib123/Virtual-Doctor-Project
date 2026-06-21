import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div>
      <footer className="footer flex justify-between py-10 px-22 bg-base-300 text-base-content">
        <aside>
          <div>
            <Link href="/" className="flex gap-1 btn-ghost text-xl">
              <div className='w-12'><img src="/Assets/Stethoscope.png" alt="Stethoscope_icon" /></div>
              <span className="font-bold text-3xl">Virtual<span className="text-cyan-600">Doc</span></span>
            </Link>
          </div>
        </aside>

        <nav>
          <h6>Resources</h6>
          <Link href=""><h1 className="link link-hover">Flowbite</h1></Link>
          <Link href=""><h1 className="link link-hover">Tailwind css</h1></Link>
          
        </nav>

        <nav>
          <h6 className="footer-title">Follow us</h6>
          <a href="https://github.com/themesberg/flowbite" className="link link-hover">Github</a>
          <a href="https://discord.gg/4eeurUVvTy" className="link link-hover">Discord</a>
        </nav>

        <nav>
          <h6 className="footer-title">Legal</h6>
          <a href="#" className="link link-hover">Privacy Policy</a>
          <a href="#" className="link link-hover">Terms &amp; Conditions</a>
        </nav>
      </footer>

      <footer className="footer flex justify-center py-3  border-t font-bold bg-gray-300 text-base-content border-base-300">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>

    </div>
  )
}
