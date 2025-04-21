"use client";

import { UserIcon } from "@/shared/icons";
import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";

export const AccountButton = () => {
  const router = useRouter();
  return (
    <Popover.Root>
      <Popover.Trigger>
        <UserIcon className="text-[#738DB8] hover:text-[#C0D3F3]" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="px-5 py-4 bg-[#1C1F24] flex flex-col gap-2 rounded-[1.25rem] border-[1px] border-[#738DB8]/20"
        >
          <span className="text-white">email@email.com</span>
          <button className="cursor-pointer text-left" onClick={() => router.replace("/")}>Выйти</button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
