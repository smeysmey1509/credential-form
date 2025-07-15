import { useState } from "react";
import CreateUserContext from "./createUser/createUserContext";
import ViewUserContext from "./viewUser/viewUserContext";
import { PopupSignal } from "./popupSignal/popupSignal";

const Work: React.FC = () => {
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false)
  const [showViewUser, setShowViewUser] = useState<boolean>(false)

  const handleCreateUser = () => {
    setShowCreateUser(true)
  };

  const handleCloseCreateUser = () => {
    setShowCreateUser(false)
  };

  const handleViewUser = () => {
    setShowViewUser(true)
  }

    const handleClsoeViewUser = () => {
    setShowViewUser(false)
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <button
        onClick={handleCreateUser}
        style={{ backgroundColor: "blue", color: 'white', cursor: "pointer", padding: '8px' }}
      >
        Add User
      </button>
      <button
        onClick={handleViewUser}
        style={{ backgroundColor: "red", color: 'white', cursor: "pointer", padding: '8px' }}
      >
        View User
      </button>
      <CreateUserContext onClose={handleCloseCreateUser} show={showCreateUser} />
      <ViewUserContext onClose={handleClsoeViewUser} show={showViewUser} />
      <PopupSignal />
    </div>
  );
};

export default Work;
