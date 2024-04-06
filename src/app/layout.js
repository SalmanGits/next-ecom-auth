"use client"
import "./globals.css";



import { cn } from "@/lib/utils"

import { Poppins } from 'next/font/google';
import Navbar from "./navbar/page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../redux/store.js'


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-poppins antialiased",
        poppins.variable
      )}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
        <Navbar />

        <Provider store={makeStore}>{children}</Provider>
      </body>
    </html>
  );
}
