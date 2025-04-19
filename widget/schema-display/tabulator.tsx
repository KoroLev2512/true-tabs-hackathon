"use client";

import React, { useState } from "react";
import { ArrowDownIcon } from "@/shared/icons/arrow-down-icon";

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
    <div>
      <div className="flex flex-col mt-[-20px] mb-2 text-var(--normal-button, rgba(115, 141, 184, 0.80)) text-2xl not-italic font-bold leading-[normal]">
        {tabs.map(tab => (
          <button
            key={tab.version_id}
            className={`px-4 py-2 cursor-pointer select-none ${
              activeTab === tab.version_id ? "text-blue-500" : "text-gray-500"
            }`}
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
        className="flex justify-center w-full items-center gap-5 cursor-pointer my-8"
        onClick={() => setTabulatorVisible(!isTabulatorVisible)}
      >
        <span className="text-2xl select-none">Версия 1.0</span>
        <ArrowDownIcon />
      </div>
      {isTabulatorVisible && <Tabulator tabs={tabs} />}
    </div>
  );
};

export default VersionTabulator;
