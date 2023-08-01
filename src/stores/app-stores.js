import {create} from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { devtools, createJSONStorage, persist } from "zustand/middleware";

const appStore = (set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set((state) => ({ userInfo })),
});
const useAppStore = create(
  devtools(
    persist(appStore, {
      name: "userInfo",
      storage: createJSONStorage(() => AsyncStorage),
    })
  )
);

export default useAppStore;
