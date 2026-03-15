"use client";

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7] text-gray-800 selection:bg-[#D4AF37] selection:text-white">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      <Footer />
    </div>
  );
}