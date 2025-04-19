"use client";

import dynamic from "next/dynamic";
import { SchemaDisplayLoader } from "./schema-display-loader";
import { useState } from "react";
import type { Monaco } from "@monaco-editor/react";
import { defineCustomTheme } from "./define-custom-theme";
import { PLACEHOLDER } from "./placeholder";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  {
    ssr: false,
    loading: () => <SchemaDisplayLoader />,
  },
);

export const SchemaDisplay = () => {
  const [schema, setSchema] = useState<string>(PLACEHOLDER);
  const handleEditorChange = (value: string | undefined) => {
    setSchema(value || "");
  };

  const handleBeforeMount = (monaco: Monaco) => {
    defineCustomTheme(monaco);
  };

  return (
    <div className="w-1/2">
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
    </div>
  );
};
