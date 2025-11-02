// import DashboardLayout from './components/DashboardLayout';

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
// export const metadata = {
//   title: 'Doctor Dashboard',
//   description: 'A modern dashboard for doctors',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={inter.className}>
//       <body>
//         <div className='mt-28'>
//           <DashboardLayout>
//             {children}
//           </DashboardLayout>
//         </div>
//       </body>
//     </html>
//   );
// }


import { Geist, Geist_Mono } from "next/font/google";
import DashboardLayout from "./components/DashboardLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mt-28"><DashboardLayout>
             {children}
           </DashboardLayout></div>
      </body>
    </html>
  );
}
