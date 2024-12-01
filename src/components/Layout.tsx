import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-red-900/90 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}