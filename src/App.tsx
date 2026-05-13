import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Navigation';
import { BottomNav } from './components/Navigation';
import { HomePage } from './pages/Home';
import { AddPage } from './pages/Add';
import { DashboardPage } from './pages/Dashboard';
import { AnalysisPage } from './pages/Analysis';
import { BudgetPage } from './pages/Budget';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 md:ml-64">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/budget" element={<BudgetPage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
