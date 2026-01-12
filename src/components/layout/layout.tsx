import { Toaster } from "@/components/ui/sonner";
import { useSession } from "@/lib/use-session";
import { cn } from "@/lib/utils";
import React from "react";
import { Outlet } from "react-router";
import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Layout() {
  const { isAuthenticated } = useSession();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {isAuthenticated && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}

        <main
          className={cn(
            "flex-1 min-w-0 transition-all duration-200 ease-in-out",
            isAuthenticated && "md:pl-64",
          )}
        >
          <div className="container mx-auto py-6 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>

      <div className={cn(isAuthenticated && "md:pl-64")}>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}
