"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "JSON-Schema Generator",
// };
export default function Page() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center gap-12 p-12 min-h-screen">
      Мы переехали
      <Button onClick={() => router.push("/chat/0")}>Чат</Button>
    </main>
  );
}
