import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

interface UserStore {
  userData: UserData | null;
  setUserData: (profile: UserData) => void;
}

const initialState: UserStore = {
  userData: null,
  setUserData: () => {},
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUserData: (profile: UserData) => set(() => ({ userData: profile })),
    }),
    { name: 'user-storage' }
  )
);
