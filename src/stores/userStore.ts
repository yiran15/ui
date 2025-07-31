import { create } from "zustand";
import { UserInfoResponse } from "../types/user/user";

interface UserState {
  user: UserInfoResponse | undefined;
  setUser: (user: UserInfoResponse | undefined) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
