import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const CreateGroupModal = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users } = useChatStore();
  const { createGroupChat } = useChatStore();

  const handleCreateGroup = () => {
    createGroupChat({ name: groupName, users: selectedUsers });
  };

  return (
    <div className="p-4">
      <input
        className="input input-bordered mb-2 w-full"
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <select
        multiple
        value={selectedUsers}
        onChange={(e) =>
          setSelectedUsers([...e.target.selectedOptions].map((o) => o.value))
        }
        className="select select-bordered w-full"
      >
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.fullName}
          </option>
        ))}
      </select>

      <button className="btn btn-primary mt-3" onClick={handleCreateGroup}>
        Create Group
      </button>
    </div>
  );
};

export default CreateGroupModal;
