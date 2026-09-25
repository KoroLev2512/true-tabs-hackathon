import { ChatTitle } from "./chat-title";
import { BackButton } from "@/features/back-button";
import { MessageArea } from "@/features/message-area";
import { SendMessageForm } from "@/features/send-message-form";
import { AccountButton } from "@/features/account-button";
import { TourTriggerButton } from "@/features/interactive-tour";

export const Chat = () => {
  return (
    <div id="tour-chat-widget" className="flex flex-col w-1/2 h-full max-h-full min-h-0 justify-between gap-3 overflow-hidden">
      <div className="flex justify-between items-center w-full shrink-0">
        <BackButton className="text-[#738DB8] opacity-80" />
        <ChatTitle />
        <div className="flex items-center gap-2">
          <TourTriggerButton />
          <AccountButton />
        </div>
      </div>
      <MessageArea />
      <div className="shrink-0 w-full">
        <SendMessageForm
          placeholder="Пример бизнес-описания: «Когда клиент оформляет заказ, система должна отправить уведомление на почту и создать запись в CRM»."
        />
      </div>
    </div>
  );
};

