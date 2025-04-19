"use client";

import { useState, useEffect } from "react";
import Loader from "@/app/loader";
import { Input } from "@/shared/input";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen">
      {isLoading
        ? (
            <div className="min-h-screen flex items-center justify-center m-auto">
              <Loader />
            </div>
          )
        : (
            <div className="flex flex-col h-screen w-full justify-end mt-auto p-3">
              <Input />
            </div>
          )}
    </div>
  );
}
