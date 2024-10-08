import { useEffect } from "react";

import FloatingButton from "../components/FloatingButton";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


export default function NotFoundPage() {
  // handle scroll to top page was loaded ( hardcoded :) )
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-center text-[#181B68]">404 - Page Not Found</h1>
      </div>
      <Footer />
      <FloatingButton />
    </>
  );
}