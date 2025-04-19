"use client";

import dynamic from "next/dynamic";
import { SchemaDisplayLoader } from "./SchemaDisplayLoader";
import { useState } from "react";
import type { Monaco } from "@monaco-editor/react";
import { defineCustomTheme } from "./defineCustomTheme";
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
    <MonacoEditor
      height="90vh"
      defaultLanguage="json"
      theme="my-custom-theme"
      beforeMount={handleBeforeMount}
      value={schema}
      loading={<SchemaDisplayLoader />}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
};
