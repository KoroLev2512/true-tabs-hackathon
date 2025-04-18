"use client";

import { useState, useEffect } from "react";
import Loader from "@/app/loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      {isLoading
        ? (
            <div className="min-h-screen flex items-center justify-center m-auto">
              <Loader />
            </div>
          )
        : (
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
          )}
    </div>
  );
}
