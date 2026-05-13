import { useState, useEffect } from 'react';
import { Transaction, Ledger, Budget, BudgetCategory, DashboardData, Category } from '../types';
import { mockTransactions, mockLedgers, mockBudget, mockBudgetCategories } from '../data/mockData';

export function useTransactions(ledgerId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const filtered = mockTransactions.filter(t => t.ledgerId === ledgerId);
      setTransactions(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [ledgerId]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return { transactions, loading, addTransaction };
}

export function useBudget(ledgerId: string) {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundBudget = mockBudget.ledgerId === ledgerId ? mockBudget : null;
      setBudget(foundBudget);
      setBudgetCategories(mockBudgetCategories);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [ledgerId]);

  const updateBudget = (newBudget: Partial<Budget>) => {
    if (budget) {
      setBudget({ ...budget, ...newBudget });
    }
  };

  return { budget, budgetCategories, loading, updateBudget };
}

export function useLedgers() {
  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const [currentLedgerId, setCurrentLedgerId] = useState<string>('1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLedgers(mockLedgers);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const currentLedger = ledgers.find(l => l.id === currentLedgerId);

  return { ledgers, currentLedgerId, currentLedger, setCurrentLedgerId, loading };
}

export function useDashboardData(ledgerId: string): { data: DashboardData | null; loading: boolean } {
  const { transactions, loading: txLoading } = useTransactions(ledgerId);
  const { budget, budgetCategories, loading: budgetLoading } = useBudget(ledgerId);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (txLoading || budgetLoading) {
      setLoading(true);
      return;
    }

    const expenses = transactions.filter(t => t.type === 'expense');
    const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    const categorySpending: Record<string, number> = {};
    expenses.forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

    const dailySpendingMap: Record<string, number> = {};
    expenses.forEach(t => {
      dailySpendingMap[t.date] = (dailySpendingMap[t.date] || 0) + t.amount;
    });

    const dailySpending = Object.entries(dailySpendingMap)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalBudget = budget?.total || 0;
    const remainingBudget = totalBudget - totalSpent;
    const budgetUsagePercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    setData({
      totalBudget,
      totalSpent,
      remainingBudget,
      budgetUsagePercent,
      transactions,
      categorySpending,
      dailySpending,
    });

    setLoading(false);
  }, [transactions, budget, txLoading, budgetLoading]);

  return { data, loading };
}
