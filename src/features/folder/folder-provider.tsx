"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { type StoreApi, createStore, useStore } from "zustand";
import type { TFolderSchema } from "~/server/api/routers/folder/folder.schema";

type FolderState = {
  folders: Map<string, TFolderSchema>;
};

type FolderActions = {
  setFolders: (props: FolderState["folders"]) => void;
  addFolder: (id: string, props: TFolderSchema) => void;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
  getFolders: () => TFolderSchema[];
};

type FoldersStore = FolderState & FolderActions;

const defaultInitState: FolderState = {
  folders: new Map(),
};

const createFoldersStore = (initState: FolderState = defaultInitState) => {
  return createStore<FoldersStore>()((set, get) => ({
    ...initState,
    setFolders: (data) => set({ folders: data }),
    addFolder: (id, data) => {
      const Folder = get().folders;
      const updatedItems = new Map(Folder);
      updatedItems.set(id, data);

      return set({ folders: updatedItems });
    },
    removeFolder: (data) => {
      const Folder = get().folders;

      const updatedItems = new Map(Folder);
      updatedItems.delete(data);

      return set({ folders: updatedItems });
    },
    renameFolder: (id, name) => {
      const Folder = get().folders;

      const updatedItems = new Map(Folder);

      const findCol = updatedItems.get(id);
      if (!findCol) return;

      const updatedFolder = { ...findCol, name };
      updatedItems.set(id, updatedFolder);

      return set({ folders: updatedItems });
    },
    getFolders: () => Array.from(get().folders.values()),
  }));
};

const FoldersStoreContext = createContext<StoreApi<FoldersStore> | null>(null);

type FoldersStoreProviderProps = { children: ReactNode; data?: TFolderSchema[] };

export const FoldersStoreProvider = ({ children, data }: FoldersStoreProviderProps) => {
  const storeRef = useRef<StoreApi<FoldersStore>>(null);

  if (!storeRef.current) {
    const folders = new Map();

    if (data) {
      for (const col of data) {
        folders.set(col.id, col);
      }
    }

    storeRef.current = createFoldersStore({ folders });
  }

  return (
    <FoldersStoreContext.Provider value={storeRef.current}>
      {children}
    </FoldersStoreContext.Provider>
  );
};

export const useFoldersStore = <T,>(selector: (store: FoldersStore) => T): T => {
  const foldersStoreContext = useContext(FoldersStoreContext);

  if (!foldersStoreContext) {
    throw new Error("useFoldersStore must be used within FoldersStoreProvider");
  }

  return useStore(foldersStoreContext, selector);
};
