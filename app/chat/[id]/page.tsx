import { Chat } from "@/widget/chat";
import { SchemaDisplay } from "@/widget/schema-display";
import type { Metadata } from "next";
import { Separator } from "@/shared/ui/separator";
import { ChatProvider } from "@/entities/chat";

export const metadata: Metadata = {
  title: "JSON-Schema Generator | Чат",
};
export default function Page() {
  return (
    <ChatProvider id={0}>
      <main className="flex gap-12 p-12 min-h-screen">
        <SchemaDisplay />
        <Separator />
        <Chat />
      </main>
    </ChatProvider>
  );
}
