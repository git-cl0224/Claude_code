import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, BarChart3, Brain, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/add', icon: PlusCircle, label: '记账' },
  { path: '/dashboard', icon: BarChart3, label: '看板' },
  { path: '/analysis', icon: Brain, label: 'AI 分析' },
  { path: '/budget', icon: Settings, label: '预算' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center p-2 rounded-xl transition-colors',
                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">💰 智能记账</h1>
        <p className="text-sm text-gray-500 mt-1">Smart Budget Tracker</p>
      </div>
      
      <nav className="space-y-2 flex-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
