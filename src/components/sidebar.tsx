'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const collapsed = isTablet || isCollapsed;
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 inset-x-0 z-50 glass-card border-t border-white/[0.06] px-2 py-2.5 flex justify-around items-center rounded-t-2xl">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isActive && (
                <motion.span
                  layoutId="mobileTab"
                  className="absolute inset-0 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-indigo-300' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <aside
      className={`relative z-30 flex flex-col h-screen glass-card border-r border-white/[0.06] transition-all duration-300 ease-out shrink-0 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <header className="h-16 flex items-center px-4 gap-3 border-b border-white/[0.04]">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-[13px] font-semibold tracking-wide text-white/90 leading-none">Aether</p>
              <p className="text-[10px] font-medium text-indigo-400/80 tracking-widest mt-0.5">LEARNING</p>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <nav className="flex-1 px-2.5 py-5 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="group relative flex items-center gap-3 py-2.5 px-3 rounded-lg w-full text-left outline-none cursor-pointer"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebarActive"
                  className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              {isActive && (
                <motion.span
                  layoutId="sidebarLine"
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-indigo-400 to-violet-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <Icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                } transition-colors`}
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-[13px] ${
                      isActive ? 'text-indigo-300 font-medium' : 'text-slate-400 group-hover:text-slate-200'
                    } transition-colors`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      <div className="p-2.5 border-t border-white/[0.04] space-y-2">
        {!isTablet && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-full p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] transition-colors outline-none cursor-pointer"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <span className="flex items-center gap-2 text-xs">
                <ChevronLeft className="w-4 h-4" />
                Collapse
              </span>
            )}
          </button>
        )}

        <div className={`flex items-center gap-2.5 p-2 rounded-lg ${collapsed ? 'justify-center' : 'bg-white/[0.02]'}`}>
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            YG
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-slate-200 truncate">Yash Gupta</p>
              <p className="text-[10px] text-slate-500 truncate">Premium Learner</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
