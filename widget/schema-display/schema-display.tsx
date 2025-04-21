"use client";

import dynamic from "next/dynamic";
import { SchemaDisplayLoader } from "./schema-display-loader";
import type { Monaco } from "@monaco-editor/react";
import { defineCustomTheme } from "./define-custom-theme";
import VersionTabulator from "@/widget/schema-display/tabulator";
import { useChat } from "@/entities/chat";
import { CopyButton } from "@/features/copy-button/copy-button";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  {
    ssr: false,
    loading: () => <SchemaDisplayLoader />,
  },
);

export const SchemaDisplay = () => {
  const schema = useChat(chat => chat.currentSchema?.currentVersion.data ?? "");

  const handleBeforeMount = (monaco: Monaco) => {
    defineCustomTheme(monaco);
  };

  return (
    <div className="w-1/2">
      <VersionTabulator />
      <div className="py-4 px-2 rounded-2xl overflow-hidden bg-[#2d3035]">
        <MonacoEditor
          height="80vh"
          defaultLanguage="json"
          className="h-full grow"
          theme="my-custom-theme"
          beforeMount={handleBeforeMount}
          value={schema}
          loading={<SchemaDisplayLoader />}
          // onChange={handleEditorChange}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="flex gap-8 justify-end">
        <CopyButton />
      </div>
    </div>
  );
};
