import type { ReactNode } from "react";
import SmoothScroll from "~/components/smooth-scroll";
import { FoldersStoreProvider } from "~/features/folder/folder-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { api } from "~/trpc/server";

const AppLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const folders = await api.folder.findAll();

  return (
    <TRPCReactProvider>
      <FoldersStoreProvider data={folders}>
        <SmoothScroll>{children}</SmoothScroll>
      </FoldersStoreProvider>
    </TRPCReactProvider>
  );
};

export default AppLayout;
