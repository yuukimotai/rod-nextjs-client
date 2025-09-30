"use server";

import { cookies } from 'next/headers'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './ui/auth-provider';
import Header from './ui/header';
import Footer from './ui/footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const jwt = (await cookieStore).get('ignidea_bearer')?.value;
  
  return (
    <>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <Header jwtString={jwt} />
              <AuthProvider jwtString={jwt}> 
                {children}
              </AuthProvider> 
              <Footer />
          </body>
        </html>
    </>
  );
}
