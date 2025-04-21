"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center gap-12 p-12 min-h-screen flex-col gap-10">
      <h1 className="font-bold text-5xl">AI Schema Builder</h1>
      <Button onClick={() => router.push("/chat/0")} className="px-12">Чат</Button>
    </main>
  );
}
