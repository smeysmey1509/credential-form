import axiosClient from "../../api/axiosClient";
import type { AuthUser } from "../AuthService/AuthService";

export type UserProfile = AuthUser & {
  createdAt?: string;
  updatedAt?: string;
};

const UserService = {
  getProfile: () => axiosClient.get<UserProfile>("/me"),
  updateProfile: (payload: Partial<Pick<UserProfile, "name" | "email">>) =>
    axiosClient.patch<UserProfile>("/me", payload),
};

export default UserService;
