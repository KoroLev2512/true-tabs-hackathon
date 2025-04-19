import { Chat } from "@/widget/chat";
import { SchemaDisplay } from "@/widget/schema-display";
import { Separator } from "@/shared/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON-Schema Generator | Чат",
};

export default function Home() {
  return (
    <main className="flex gap-12 p-12 min-h-screen">
      <SchemaDisplay />
      <Separator />
      <Chat />
    </main>
  );
}
