import { useState } from "react";
import CreateUserContext from "./createUser/createUserContext";
import ViewUserContext from "./viewUser/viewUserContext";
import { PopupSignal } from "./popupSignal/popupSignal";
import FlexTable, {
  UserTableColumns,
  UserData,
} from "../components/common/FlexTable/FlexTable";

const columns: UserTableColumns[] = [
  { key: "uuid", label: "ID", show: true },
  { key: "username", label: "Username", show: true },
  { key: "description", label: "Description", show: true },
  { key: "isActive", label: "Status", show: true },
];

const FullColumns: UserTableColumns[] = [
  { key: "uuid", label: "ID", show: true },
  { key: "username", label: "Username", show: true, width: "20%" },
  { key: "email", label: "Email", show: true, width: "20%" },
  { key: "createdAt", label: "Create at", show: true },
  { key: "updatedAt", label: "Update at", show: true },
  { key: "isActive", label: "Status", show: true },
];

const data: UserData[] = [
  {
    uuid: "1",
    username: "john_doe",
    description: "Has login successfully.",
    isActive: "ACTIVE",
    profile: "https://i.pravatar.cc/100?u=john",
  },
  {
    uuid: "2",
    username: "jane_smith",
    description: "Has login successfully.",
    isActive: "ONHOLD",
    profile: "https://i.pravatar.cc/100?u=jane",
  },
];

const fullData: UserData[] = [
  {
    uuid: "001",
    username: "Devit",
    email: "devit@example.com",
    createdAt: "2024-07-01 10:00",
    updatedAt: "2024-07-17 09:30",
    isActive: "ACTIVE",
    profile: "https://i.pravatar.cc/100?u=devit",
  },
  {
    uuid: "002",
    username: "Alice",
    email: "alice@example.com",
    createdAt: "2024-07-02 11:15",
    updatedAt: "2024-07-17 09:45",
    isActive: "ACTIVE",
    profile: "https://i.pravatar.cc/100?u=alice",
  },
  {
    uuid: "003",
    username: "Bob",
    email: "bob@example.com",
    createdAt: "2024-07-03 12:20",
    updatedAt: "2024-07-17 10:00",
    isActive: "DEACTIVATE",
    profile: "https://i.pravatar.cc/100?u=bob",
  },
  {
    uuid: "004",
    username: "Charlie",
    email: "charlie@example.com",
    createdAt: "2024-07-04 13:30",
    updatedAt: "2024-07-17 10:15",
    isActive: "PENDING",
    profile: "https://i.pravatar.cc/100?u=charlie",
  },
];

const Work: React.FC = () => {
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
  const [showViewUser, setShowViewUser] = useState<boolean>(false);

  const handleCreateUser = () => {
    setShowCreateUser(true);
  };

  const handleCloseCreateUser = () => {
    setShowCreateUser(false);
  };

  const handleViewUser = () => {
    setShowViewUser(true);
  };

  const handleClsoeViewUser = () => {
    setShowViewUser(false);
  };

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
        style={{
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        Add User
      </button>
      <button
        onClick={handleViewUser}
        style={{
          backgroundColor: "red",
          color: "white",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        View User
      </button>
      <CreateUserContext
        onClose={handleCloseCreateUser}
        show={showCreateUser}
      />
      <ViewUserContext onClose={handleClsoeViewUser} show={showViewUser} />
      <PopupSignal />
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        <FlexTable columns={columns} data={data} showAvatar={true} />
      </div>
      <div
        style={{
          marginTop: "18px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <FlexTable columns={FullColumns} data={fullData} showAvatar={true} showCheckbox={true} showAction={true} />
      </div>
    </div>
  );
};

export default Work;
