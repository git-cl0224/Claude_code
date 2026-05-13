import { formatCurrency, calculateBudgetStatus } from '../lib/utils';
import { DashboardData, BudgetCategory } from '../types';
import { CATEGORY_ICONS } from '../data/mockData';
import { Brain } from 'lucide-react';

interface BudgetCardProps {
  data: DashboardData;
  onAnalyzeClick: () => void;
}

export function BudgetCard({ data, onAnalyzeClick }: BudgetCardProps) {
  const { percent, status } = calculateBudgetStatus(data.totalSpent, data.totalBudget);
  
  const statusColors = {
    normal: 'border-primary/20 bg-gradient-to-br from-sky-50 to-white',
    warning: 'border-warning/20 bg-gradient-to-br from-amber-50 to-white',
    danger: 'border-danger/20 bg-gradient-to-br from-red-50 to-white',
  };

  return (
    <div className="card border-2 transition-colors" style={{ borderColor: status === 'danger' ? '#fecaca' : status === 'warning' ? '#fef3c7' : '#e0f2fe', backgroundColor: status === 'danger' ? '#fef2f2' : status === 'warning' ? '#fffbeb' : '#f0f9ff' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">月度预算进度</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'normal' ? 'bg-primary/10 text-primary' : status === 'warning' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'}`}>
          {status === 'normal' && '正常'}
          {status === 'warning' && '预警'}
          {status === 'danger' && '超支'}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">
            {formatCurrency(data.totalSpent)}
          </span>
          <span className="text-gray-400">/ {formatCurrency(data.totalBudget)}</span>
        </div>
        
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${status === 'danger' ? 'bg-danger' : status === 'warning' ? 'bg-warning' : 'bg-primary'}`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">剩余预算</span>
        <span className={`font-semibold ${data.remainingBudget >= 0 ? 'text-success' : 'text-danger'}`}>
          {formatCurrency(data.remainingBudget)}
        </span>
      </div>

      {status !== 'normal' && (
        <button 
          onClick={onAnalyzeClick}
          className={`w-full mt-4 py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${status === 'danger' ? 'bg-danger text-white hover:bg-red-600' : 'bg-primary text-white hover:bg-sky-600'}`}
        >
          <Brain className="w-4 h-4" />
          AI 分析超支原因
        </button>
      )}
    </div>
  );
}

interface OverviewCardProps {
  data: DashboardData;
}

export function OverviewCard({ data }: OverviewCardProps) {
  const expenses = data.transactions.filter(t => t.type === 'expense');
  const maxTransaction = expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0] || { amount: 0 });
  const avgDaily = data.totalSpent / new Date().getDate();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">本月概览</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">总支出</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(data.totalSpent)}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">最大单笔</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(maxTransaction?.amount || 0)}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">日均支出</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(avgDaily)}</p>
        </div>
      </div>
    </div>
  );
}

interface RecentTransactionsProps {
  transactions: DashboardData['transactions'];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', { month: 'short', day: 'numeric' }).format(date);
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">最近记录</h3>
      
      <div className="space-y-3">
        {recent.map(tx => (
          <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                {CATEGORY_ICONS[tx.category as keyof typeof CATEGORY_ICONS]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{tx.category}</p>
                <p className="text-sm text-gray-500">{tx.note || formatDate(tx.date)}</p>
              </div>
            </div>
            <span className={`font-semibold ${tx.type === 'income' ? 'text-success' : 'text-gray-900'}`}>
              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CategoryRankingProps {
  categorySpending: Record<string, number>;
  budgetCategories?: BudgetCategory[];
}

export function CategoryRanking({ categorySpending, budgetCategories }: CategoryRankingProps) {
  const sorted = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">分类消费排行</h3>
      
      <div className="space-y-4">
        {sorted.map(([category, amount]) => {
          const budgetCat = budgetCategories?.find(bc => bc.category === category);
          const limit = budgetCat?.limitAmount || 0;
          const pct = limit > 0 ? (amount / limit) * 100 : 0;
          
          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}</span>
                  <span className="font-medium text-gray-700">{category}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(amount)}</p>
                  {limit > 0 && (
                    <p className="text-xs text-gray-500">{formatCurrency(limit)} 预算</p>
                  )}
                </div>
              </div>
              {limit > 0 && (
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-danger' : pct >= 80 ? 'bg-warning' : 'bg-primary'}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
