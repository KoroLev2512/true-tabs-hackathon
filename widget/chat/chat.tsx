import { ChatTitle } from "./chat-title";
import { BackButton } from "@/features/back-button";
import { MessageArea } from "@/features/message-area";
import { SendMessageForm } from "@/features/send-message-form";
import { AccountButton } from "@/features/account-button";

export const Chat = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-1/2">
      <div className="flex justify-between w-full">
        <BackButton className="text-[#738DB8] opacity-80" />
        <ChatTitle />
        <AccountButton />
      </div>
      <MessageArea />
      <SendMessageForm
        placeholder="Пример бизнес-описания: «Когда клиент оформляет заказ, система должна отправить уведомление на почту и создать запись в CRM»."
      />
    </div>
  );
};
