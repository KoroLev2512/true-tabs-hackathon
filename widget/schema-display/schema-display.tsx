"use client";

import dynamic from "next/dynamic";
import { SchemaDisplayLoader } from "./schema-display-loader";
import type { Monaco } from "@monaco-editor/react";
import { defineCustomTheme } from "./define-custom-theme";
import VersionTabulator from "@/widget/schema-display/tabulator";
import { useChat } from "@/entities/chat";
import { CopyButton } from "@/features/copy-button/copy-button";
import { ExportAsFileButton } from "@/features/export-as-file-button";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  {
    ssr: false,
    loading: () => <SchemaDisplayLoader />,
  },
);

export const SchemaDisplay = () => {
  const schema = useChat(chat => chat.currentSchema?.data ?? "");

  const handleBeforeMount = (monaco: Monaco) => {
    defineCustomTheme(monaco);
  };

  return (
    <div id="tour-schema-display" className="w-1/2 h-full max-h-full flex flex-col min-h-0 overflow-hidden">
      <div id="tour-version-tabulator" className="shrink-0">
        <VersionTabulator />
      </div>
      <div id="tour-monaco-editor" className="py-3 px-2 rounded-2xl overflow-hidden bg-[#2d3035] flex-1 min-h-0 relative">
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          className="h-full w-full"
          theme="my-custom-theme"
          beforeMount={handleBeforeMount}
          value={schema || "// Здесь появится сгенерированная JSON-схема после вашего запроса"}
          loading={<SchemaDisplayLoader />}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div id="tour-schema-actions" className="flex gap-3 justify-end items-center mt-2 shrink-0">
        <ExportAsFileButton />
        <CopyButton />
      </div>
    </div>
  );
};
