import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { Header } from './header';
import { Footer } from './footer';
import { Sidebar } from './sidebar';
import { useSession } from '@/lib/use-session';
import { cn } from '@/lib/utils';

export function Layout() {
  const { isAuthenticated } = useSession();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        {isAuthenticated && (
          <Sidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
          />
        )}
        
        <main className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          isAuthenticated && "md:ml-64"
        )}>
          <div className="container mx-auto py-6 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
      <Toaster />
    </div>
  );
}
