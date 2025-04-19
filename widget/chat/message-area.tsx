"use client";

import { Message } from "./message";

export const MessageArea = () => {
  return (
    <div className="flex flex-col grow w-full gap-5">
      <Message author="gpt">
        Опишите ваш бизнес-процесс простыми словами — мы преобразуем его в структурированную схему.
      </Message>
      <Message author="user">
        Представим, что тут расписан бизнес-процесс от пользователя блаблаблабла
      </Message>
    </div>
  );
};
