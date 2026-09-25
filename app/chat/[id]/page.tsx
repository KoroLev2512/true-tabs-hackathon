import { Chat } from "@/widget/chat";
import { SchemaDisplay } from "@/widget/schema-display";
import type { Metadata } from "next";
import { Separator } from "@/shared/ui/separator";
import { ChatProvider } from "@/entities/chat";

import { InteractiveTour } from "@/features/interactive-tour";

export const metadata: Metadata = {
  title: "JSON-Schema Generator | Чат",
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10) || 0;

  return (
    <ChatProvider id={numericId}>
      <main className="flex gap-8 px-6 pt-6 pb-4 h-screen w-screen max-h-screen max-w-full overflow-hidden relative box-border">
        <SchemaDisplay />
        <Separator />
        <Chat />
        <InteractiveTour />
      </main>
    </ChatProvider>
  );
}
