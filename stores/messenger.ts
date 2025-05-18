import { createZustandStore } from "@/services/store";
import { randomUUID } from "expo-crypto";

type Message = {
  isSender: boolean;
  time: Date;
  data: string;
};

type MessengerState = {
  UUID?: string;
  connectedUUID?: string;
  messages: Message[];
  getUUID(): string;
  setConnectedUUID(uuid: string): void;
  addMessage(mes: Message): void;
};

export const useMessengerStore = createZustandStore<MessengerState>(
  (set, get) => ({
    messages: [],
    getUUID() {
      let UUID = get().UUID;
      if (UUID == null) {
        UUID = randomUUID();
        set((state) => ({ ...state, UUID }));
      }
      return UUID;
    },
    setConnectedUUID(uuid) {
      if (get().connectedUUID !== uuid) {
        set((state) => ({ ...state, messages: [] }));
      }
      set((state) => ({ ...state, connectedUUID: uuid }));
    },
    addMessage(mes) {
      set((state) => ({ ...state, messages: [...get().messages, mes] }));
    },
  }),
  "messenger-store"
);
