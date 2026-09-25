"use client";

import { useChat } from "@/entities/chat";
import { DownloadIcon } from "@/shared/icons";

export const ExportAsFileButton = () => {
  const schema = useChat(chat => chat.currentSchema);

  if (!schema?.data) return null;

  const handleDownload = () => {
    const blob = new Blob([schema.data], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fileName = `schema-${schema.version || "latest"}.json`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      title="Скачать схему как .json"
      className="p-2 rounded-xl text-[#738DB8] hover:text-[#C0D3F3] hover:bg-[#2D3035] transition-all duration-200 cursor-pointer flex items-center justify-center"
    >
      <DownloadIcon />
    </button>
  );
};

