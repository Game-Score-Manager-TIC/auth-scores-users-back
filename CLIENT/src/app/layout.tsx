import React from "react";
import type { Metadata } from "next";
import SideNav from "client/components/navbar/sideNavbar";
import "./globals.css";
import { montserrat } from "./fonts";
import { Providers } from "client/redux/providers";

export const metadata: Metadata = {
  title: "Game Score Manager",
  description: "Game Score Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${montserrat.className}  flex h-screen flex-col md:flex-row md:overflow-hidden`}
        >
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-d-blue text-white">
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
