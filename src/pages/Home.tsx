import React from 'react';
import { useLedgers, useDashboardData } from '../hooks/useData';
import { BudgetCard, OverviewCard, RecentTransactions, CategoryRanking } from '../components/DashboardCards';
import { QuickAddButton } from '../components/TransactionForm';
import { Card, Select } from '../components/ui';
import { Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  const { ledgers, currentLedgerId, currentLedger, setCurrentLedgerId, loading: ledgersLoading } = useLedgers();
  const { data, loading } = useDashboardData(currentLedgerId);

  if (ledgersLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">
        暂无数据，请先设置预算
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {currentLedger?.icon} {currentLedger?.name}
            </h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
            </p>
          </div>
          
          <select
            value={currentLedgerId}
            onChange={(e) => setCurrentLedgerId(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {ledgers.map(ledger => (
              <option key={ledger.id} value={ledger.id}>
                {ledger.icon} {ledger.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-5xl mx-auto space-y-4">
        {/* Budget Progress Card - Core Feature */}
        <BudgetCard 
          data={data} 
          onAnalyzeClick={() => navigate('/analysis')}
        />

        {/* Overview */}
        <OverviewCard data={data} />

        {/* Two Column Layout for larger screens */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Recent Transactions */}
          <RecentTransactions transactions={data.transactions} />
          
          {/* Category Ranking */}
          <CategoryRanking 
            categorySpending={data.categorySpending}
          />
        </div>
      </div>

      {/* Quick Add Button */}
      <QuickAddButton />
    </div>
  );
}
