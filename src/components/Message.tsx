import Image from "next/image";
import { ReactNode } from "react";

type MessageProps = {
  avatar: string;
  username: string;
  bot: boolean;
  children: ReactNode;
};

const Message = ({ avatar, username, bot, children }: MessageProps) => {
  return (
    <div className="flex gap-4 p-4">
      <Image
        width={40}
        height={40}
        src={avatar}
        alt={`${username}'s avatar`}
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold hover:underline cursor-pointer">{username}</span>
          {bot && (
            <span className="px-1.5 text-xs text-white font-bold bg-blue-500 rounded">
              BOT
            </span>
          )}
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
};

export default Message;
