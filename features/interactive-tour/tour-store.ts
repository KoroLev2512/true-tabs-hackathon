import { create } from "zustand";

export interface TourStep {
  targetId: string
  title: string
  description: string
  placement?: "top" | "bottom" | "left" | "right" | "center"
}

export const TOUR_STEPS: TourStep[] = [
  {
    targetId: "tour-message-area",
    title: "Интеллектуальный чат",
    description: "Здесь оживает диалог с ИИ. Опишите ваш бизнес-процесс или структуру данных простыми словами — система автоматически создаст корректную схему.",
    placement: "left",
  },
  {
    targetId: "tour-send-message-form",
    title: "Ввод запроса",
    description: "Введите формулировку задачи или уточнение (например: «Добавь поле статуса заказа и валидацию email»). Для быстрой отправки нажимайте клавишу Enter.",
    placement: "top",
  },
  {
    targetId: "tour-monaco-editor",
    title: "Редактор схемы",
    description: "В правой области отображается сгенерированная схема в Monaco Editor. Доступна подсветка синтаксиса, сворачивание блоков и валидация формата.",
    placement: "right",
  },
  {
    targetId: "tour-version-tabulator",
    title: "История версий",
    description: "Каждое новое сообщение в чате создаёт новую версию схемы (v1.0, v2.0...). Вы можете легко переключаться между ними в выпадающем списке.",
    placement: "bottom",
  },
  {
    targetId: "tour-schema-actions",
    title: "Экспорт и сохранение",
    description: "Готовую схему можно скачать в виде отдельного файла .json на компьютер или мгновенно скопировать её содержимое в буфер обмена.",
    placement: "top",
  },
];

interface TourState {
  isOpen: boolean
  currentStep: number
  startTour: () => void
  nextStep: () => void
  prevStep: () => void
  closeTour: () => void
}

export const useTourStore = create<TourState>(set => ({
  isOpen: false,
  currentStep: 0,
  startTour: () => set({ isOpen: true, currentStep: 0 }),
  nextStep: () =>
    set(state => {
      if (state.currentStep < TOUR_STEPS.length - 1) {
        return { currentStep: state.currentStep + 1 };
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("true_tabs_tour_completed", "true");
      }
      return { isOpen: false, currentStep: 0 };
    }),
  prevStep: () =>
    set(state => ({
      currentStep: Math.max(0, state.currentStep - 1),
    })),
  closeTour: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("true_tabs_tour_completed", "true");
    }
    set({ isOpen: false, currentStep: 0 });
  },
}));
