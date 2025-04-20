"use client";

import React, { useState } from "react";
import { ArrowDownIcon } from "@/shared/icons";
import { cn } from "@/shared/utils";

interface Tab {
  version: string
  version_id: number
}

interface TabulatorProps {
  tabs: Tab[]
}

const Tabulator: React.FC<TabulatorProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].version_id);

  return (
    <div className="absolute z-50 w-full top-24 flex justify-center">
      <div className="flex flex-col w-48 rounded-lg mb-2 font-jetbrains-mono bg-[#1C1F24]">
        {tabs.map(tab => (
          <button
            key={tab.version_id}
            className={cn("px-4 py-2 cursor-pointer select-none",
              activeTab === tab.version_id ? "text-blue-500" : "text-gray-500",
            )}
            onClick={() => setActiveTab(tab.version_id)}
          >
            {tab.version}
          </button>
        ))}
      </div>
    </div>
  );
};

const VersionTabulator: React.FC = () => {
  const [isTabulatorVisible, setTabulatorVisible] = useState(false);

  const tabs = [
    { version: "v1.0", version_id: 0 },
    { version: "v2.0", version_id: 1 },
    { version: "v3.0", version_id: 2 },
  ];

  return (
    <div>
      <div
        className="flex justify-center w-full items-center gap-5 cursor-pointer my-4"
        onClick={() => setTabulatorVisible(!isTabulatorVisible)}
      >
        <span
          className="select-none font-jetbrains-mono text-var(--normal-button, rgba(115, 141, 184, 0.80)) text-2xl not-italic font-bold leading-[normal]"
        >
          Версия 1.0
        </span>
        <ArrowDownIcon />
        {isTabulatorVisible && <Tabulator tabs={tabs} />}
      </div>
    </div>
  );
};

export default VersionTabulator;
