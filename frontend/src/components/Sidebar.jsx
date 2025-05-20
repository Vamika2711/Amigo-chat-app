import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

 const {onlineUsers}=useAuthStore();
 const[showOnlineOnly ,setShowOnlineOnly]= useState(false);
  

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm"> online </span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
         {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;

// import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { Users } from "lucide-react";
// import GroupChatCard from "./GroupChatCard";
// import DirectChatCard from "./DirectChatCard";

// const Sidebar = () => {
//   const {
//     getUsers,
//     users,
//     chats=[],
//     selectedUser,
//     setSelectedUser,
//     isUsersLoading,
//     setSelectedChat,
//   } = useChatStore();
  

//   const { onlineUsers } = useAuthStore();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   if (isUsersLoading) return <SidebarSkeleton />;

//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       {/* Top Section */}
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="checkbox checkbox-sm"
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           <span className="text-xs text-zinc-500">
//             ({onlineUsers.length - 1} online)
//           </span>
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="overflow-y-auto w-full py-3 px-1">
//         {(chats ?? []).map((chat) =>
//           chat.isGroupChat ? (
//             <GroupChatCard
//               chat={chat}
//               key={chat._id}
//               // onClick={() => setSelectedChat(chat)}
//             />
//           ) : (
//             <DirectChatCard
//               user={chat.otherUser}
//               key={chat._id}
//               // onClick={() => setSelectedUser(chat.otherUser)}
//             />
//           )
//         )}

//         {chats.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No conversations yet</div>
//         )}
//       </div>

//       {/* Optional: Start New Chat Section */}
//       <div className="mt-auto border-t border-base-300 p-4 hidden lg:block">
//         <h2 className="text-sm font-semibold mb-2">Start New Chat</h2>
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
//               selectedUser?._id === user._id
//                 ? "bg-base-300 ring-1 ring-base-300"
//                 : ""
//             }`}
//           >
//             <div className="relative">
//               <img
//                 src={user.profilePic || "/avatar.png"}
//                 alt={user.name}
//                 className="size-10 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-zinc-900" />
//               )}
//             </div>
//             <div className="text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-xs text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

// import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { Users } from "lucide-react";
// import GroupChatCard from "./GroupChatCard"; // ← Make sure this exists
// import DirectChatCard from "./DirectChatCard"; // ← Make sure this exists
// import CreateGroupModal from "./CreateGroupModal";
// const Sidebar = () => {
//   const {
//     getUsers,
//     users,
//     selectedUser,
//     setSelectedUser,
//     isUsersLoading,
//     chats = [],
//     getChats
//   } = useChatStore();

//   const { onlineUsers } = useAuthStore();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  
// const [showCreateGroup, setShowCreateGroup] = useState(false);

//   useEffect(() => {
//     getChats();
//   }, [getChats]);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   if (isUsersLoading) return <SidebarSkeleton />;
  

//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>

//         <div className="flex justify-between items-center mt-3">
//     <button
//       className="btn btn-sm btn-primary hidden lg:block"
//       onClick={() => setShowCreateGroup(true)} // You'll need this state
//     >
//       + Create Group
//     </button>
//   </div>

//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="checkbox checkbox-sm"
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           <span className="text-xs text-zinc-500">
//             ({onlineUsers.length - 1} online)
//           </span>
//         </div>
//       </div>

//       <div className="mt-4 border-t border-base-300 pt-3">
//   <h3 className="text-sm font-semibold px-3 text-zinc-500">Chats</h3>
//   {chats.length === 0 ? (
//     <p className="text-center text-zinc-500 py-2">No chats yet</p>
//   ) : (
//     chats.map(chat =>
//       chat.isGroupChat ? (
//         <GroupChatCard chat={chat} key={chat._id} />
//       ) : (
//         <DirectChatCard user={chat.otherUser} key={chat._id} />
//       )
//     )
//   )}
// </div>


//       <div className="overflow-y-auto w-full py-3 flex-1">
//         {chats.length > 0 ? (
//           chats.map((chat) =>
//             chat.isGroupChat ? (
//               <GroupChatCard chat={chat} key={chat._id} />
//             ) : (
//               <DirectChatCard user={chat.otherUser} key={chat._id} />
//             )
//           )
//         ) : (
//           filteredUsers.map((user) => (
//             <button
//               key={user._id}
//               onClick={() => setSelectedUser(user)}
//               className={`
//                 w-full p-3 flex items-center gap-3
//                 hover:bg-base-300 transition-colors
//                 ${
//                   selectedUser?._id === user._id
//                     ? "bg-base-300 ring-1 ring-base-300"
//                     : ""
//                 }
//               `}
//             >
//               <div className="relative mx-auto lg:mx-0">
//                 <img
//                   src={user.profilePic || "/avatar.png"}
//                   alt={user.name}
//                   className="size-12 object-cover rounded-full"
//                 />
//                 {onlineUsers.includes(user._id) && (
//                   <span
//                     className="absolute bottom-0 right-0 size-3 bg-green-500 
//                     rounded-full ring-2 ring-zinc-900"
//                   />
//                 )}
//               </div>

//               <div className="hidden lg:block text-left min-w-0">
//                 <div className="font-medium truncate">{user.fullName}</div>
//                 <div className="text-sm text-zinc-400">
//                   {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//                 </div>
//               </div>
//             </button>
//           ))
//         )}

//         {filteredUsers.length === 0 && chats.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No online users</div>
//         )}
//       </div>

//       {showCreateGroup && (
//   <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
//     <div className="bg-base-100 p-6 rounded-xl w-full max-w-md relative">
//       <button
//         className="absolute top-2 right-2 btn btn-sm btn-ghost"
//         onClick={() => setShowCreateGroup(false)}
//       >
//         ✕
//       </button>
//       <CreateGroupModal />
//     </div>
//   </div>
// )}

//     </aside>
//   );
// };

// export default Sidebar;

