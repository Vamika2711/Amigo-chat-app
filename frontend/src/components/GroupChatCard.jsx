import { Users } from "lucide-react";

const GroupChatCard = ({ chat, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
    >
      <div className="relative mx-auto lg:mx-0">
        <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center">
          <Users className="text-primary w-6 h-6" />
        </div>
      </div>

      {/* Chat info - only visible on larger screens */}
      <div className="hidden lg:block text-left min-w-0">
        <div className="font-medium truncate">{chat.chatName}</div>
        <div className="text-sm text-zinc-400">Group Chat</div>
      </div>
    </button>
  );
};

export default GroupChatCard;
