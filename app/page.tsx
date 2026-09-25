"use client";

import Link from "next/link";
import { ChatBubbleIcon, CodeBracketsIcon, GitBranchIcon } from "@/shared/icons";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-[#16181D] via-[#121418] to-[#0E1013] text-[#F8F8F8]">
      {/* Headline */}
      <h1 className="font-bold text-4xl sm:text-6xl leading-tight tracking-tight text-white whitespace-nowrap">
        {"Редактор "}
        <span className="text-[#E30611]">
          JSON-схем
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-[#8E9BAE] max-w-lg font-normal leading-relaxed">
        Генерация, валидация и версионирование спецификаций рабочих процессов в диалоге
      </p>

      {/* Action button */}
      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/chat/0"
          className="px-8 py-4 text-sm font-semibold rounded-xl bg-[#E30611] hover:bg-[#C4000B] active:scale-95 text-white transition-all shadow-md shadow-red-600/20 cursor-pointer inline-flex items-center justify-center"
        >
          Перейти в редактор и чат
        </Link>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mt-14 text-left">
        <div className="p-5 rounded-xl bg-[#1C1F24] border border-white/5 hover:border-[#E30611]/40 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-[#E30611]/15 text-[#E30611] flex items-center justify-center mb-3">
            <ChatBubbleIcon className="w-4 h-4" />
          </div>
          <h3 className="font-medium text-base text-white mb-1.5">Чат</h3>
          <p className="text-xs text-[#8E9BAE] leading-relaxed">
            Построение и уточнение схемы через описание шагов и полей бизнес-процесса.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1C1F24] border border-white/5 hover:border-[#E30611]/40 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-[#E30611]/15 text-[#E30611] flex items-center justify-center mb-3">
            <CodeBracketsIcon className="w-4 h-4" />
          </div>
          <h3 className="font-medium text-base text-white mb-1.5">Monaco Editor</h3>
          <p className="text-xs text-[#8E9BAE] leading-relaxed">
            Подсветка синтаксиса, форматирование JSON и выгрузка готового файла.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#1C1F24] border border-white/5 hover:border-[#E30611]/40 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-[#E30611]/15 text-[#E30611] flex items-center justify-center mb-3">
            <GitBranchIcon className="w-4 h-4" />
          </div>
          <h3 className="font-medium text-base text-white mb-1.5">Версионирование</h3>
          <p className="text-xs text-[#8E9BAE] leading-relaxed">
            Табулятор итераций для мгновенного отката и сравнения вариантов схемы.
          </p>
        </div>
      </div>
    </main>
  );
}
