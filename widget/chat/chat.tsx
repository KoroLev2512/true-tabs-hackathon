import { ChatTitle } from "./chat-title";
import { BackButton } from "@/features/back-button";
import { MessageArea } from "@/features/message-area";
import { SendMessageForm } from "@/features/send-message-form";

export const Chat = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-1/2">
      <div className="flex relative justify-center w-full">
        <ChatTitle />
        <BackButton className="absolute left-0 text-[#738DB8] opacity-80" />
      </div>
      <MessageArea />
      <SendMessageForm
        placeholder="Пример бизнес-описания: «Когда клиент оформляет заказ, система должна отправить уведомление на почту и создать запись в CRM»."
      />
    </div>
  );
};
