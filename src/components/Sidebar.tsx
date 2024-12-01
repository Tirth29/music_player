import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp, Library, Compass, Settings, LogOut, Menu } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <div className={`w-64 bg-black border-r border-white/10 p-4 flex flex-col fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="text-red-500 text-2xl">♪</div>
          <h1 className="text-xl font-bold"><span className="text-red-500">Dream</span><span className='text-white/80'>Music</span></h1>
        </div>
        
        <div className="space-y-1">
          <h2 className="text-xs uppercase text-white/60 font-bold px-2 mb-2">MENU</h2>
          <Link to="/" className="flex items-center gap-4 text-white/80 hover:text-white px-2 py-2 rounded-lg hover:bg-white/10">
            <Home size={20} />
            Home
          </Link>
          <Link to="/trends" className="flex items-center gap-4 text-white/80 hover:text-white px-2 py-2 rounded-lg hover:bg-white/10">
            <TrendingUp size={20} />
            Trends
          </Link>
          <Link to="/library" className="flex items-center gap-4 text-white/80 hover:text-white px-2 py-2 rounded-lg hover:bg-white/10">
            <Library size={20} />
            Library
          </Link>
          <Link to="/discover" className="flex items-center gap-4 text-white/80 hover:text-white px-2 py-2 rounded-lg hover:bg-white/10">
            <Compass size={20} />
            Discover
          </Link>
        </div>

        <div className="mt-auto space-y-1">
          <h2 className="text-xs uppercase text-white/60 font-bold px-2 mb-2">GENERAL</h2>
          <Link to="/settings" className="flex items-center gap-4 text-white/80 hover:text-white px-2 py-2 rounded-lg hover:bg-white/10">
            <Settings size={20} />
            Settings
          </Link>
          <button className="w-full flex items-center gap-4 text-white/80 hover:text-white px-2 py-2 rounded-lg hover:bg-white/10">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

