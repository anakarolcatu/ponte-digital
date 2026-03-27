import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 lg:ml-72">
          <Topbar />

          <main className="px-6 py-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}