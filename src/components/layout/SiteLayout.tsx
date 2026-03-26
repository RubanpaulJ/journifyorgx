import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { StudentChatbot } from "../widgets/StudentChatbot";

export function SiteLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:pb-10">
        <Outlet />
      </main>
      <Footer />
      <StudentChatbot />
      <FloatingWhatsApp />
      <StickyMobileCTA />
    </div>
  );
}

