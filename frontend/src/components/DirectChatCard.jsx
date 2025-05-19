const DirectChatCard = ({ user, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
      >
        <div className="relative mx-auto lg:mx-0">
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.fullName}
            className="size-12 object-cover rounded-full"
          />
        </div>
  
        {/* User info - only visible on larger screens */}
        <div className="hidden lg:block text-left min-w-0">
          <div className="font-medium truncate">{user.fullName}</div>
          <div className="text-sm text-zinc-400">Direct Message</div>
        </div>
      </button>
    );
  };
  
  export default DirectChatCard;
  