import { Chat } from "@/widget/chat";
import { SchemaDisplay } from "@/widget/schema-display";
import type { Metadata } from "next";
import { Separator } from "@/shared/ui/separator";

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
