
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ThemeProvider } from '../ThemeProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="relative flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
