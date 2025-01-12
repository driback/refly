"use client";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";

import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/shallow";

export type SelectableItem = {
  id: string;
  name: string;
};

type SelectableState = {
  list: Map<string, SelectableItem>;
  isEmpty: boolean;
};

type SelectableAction = {
  addItem: (props: SelectableItem) => void;
  removeItem: (data: string) => void;
  removeAllItems: () => void;
  getList: () => SelectableItem[];
};

type SelectableStore = SelectableState & SelectableAction;

const defaultInitState: SelectableState = {
  list: new Map(),
  isEmpty: true,
};

const createSelectableStore = (initState: SelectableState = defaultInitState) => {
  return createStore<SelectableStore>()((set, get) => ({
    ...initState,
    addItem: (item) =>
      set((state) => {
        const updatedItems = new Map(state.list);
        updatedItems.set(item.id, item);

        let output: Partial<SelectableState> = { list: updatedItems };

        if (state.isEmpty) {
          output = { ...output, isEmpty: false };
        }

        return output;
      }),
    removeItem: (prop) =>
      set((state) => {
        const updatedItems = new Map(state.list);
        updatedItems.delete(prop);

        let output: Partial<SelectableState> = { list: updatedItems };

        if (!state.isEmpty && updatedItems.size < 1) {
          output = { ...output, isEmpty: true };
        }

        return output;
      }),
    removeAllItems: () => set(() => ({ ...defaultInitState })),
    getList: () => [...get().list.values()],
  }));
};

const useSelectableStore = <T,>(selector: (store: SelectableStore) => T): T => {
  const selectableStoreContext = useContext(SelectableStoreContext);

  if (!selectableStoreContext) {
    throw new Error("useSelectableStore must be use within SelectableStoreContext");
  }

  return useStore(selectableStoreContext, useShallow(selector));
};

const SelectableStoreContext = createContext<StoreApi<SelectableStore> | null>(null);

type SelectableStoreProviderProps = { children: ReactNode };

const SelectableStoreProvider = ({ children }: SelectableStoreProviderProps) => {
  const storeRef = useRef<StoreApi<SelectableStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createSelectableStore();
  }

  return (
    <SelectableStoreContext.Provider value={storeRef.current}>
      {children}
    </SelectableStoreContext.Provider>
  );
};

export { SelectableStoreProvider, useSelectableStore };
