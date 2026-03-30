import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        mobile
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {isMobileSidebarOpen ? (
        <button
          aria-label="Fechar menu lateral"
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      ) : null}

      <div className="flex">
        <Sidebar />

        <div className="flex-1 lg:ml-72">
          <Topbar onOpenSidebar={() => setIsMobileSidebarOpen(true)} />

          <main className="px-6 py-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
