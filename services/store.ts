import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  create,
  StateCreator as StateCreatorZustand,
  StoreApi,
  UseBoundStore,
} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StateCreator<T> = StateCreatorZustand<T> &
  Parameters<typeof persist<T>>[0];

export const createZustandStore = <T>(
  stateCreator: StateCreator<T>,
  storeKey?: string
): UseBoundStore<StoreApi<T>> => {
  if (!storeKey) {
    return create<T>()(stateCreator);
  }

  return create<T>()(
    persist(stateCreator, {
      name: storeKey,
      storage: createJSONStorage(() => AsyncStorage),
    })
  );
};
