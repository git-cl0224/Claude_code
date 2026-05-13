export type TransactionType = 'income' | 'expense';

export type Category = 
  | '餐饮'
  | '交通'
  | '购物'
  | '娱乐'
  | '住房'
  | '医疗'
  | '教育'
  | '其他';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  note: string;
  date: string;
  ledgerId: string;
}

export interface Ledger {
  id: string;
  name: string;
  icon: string;
  userId: string;
}

export interface Budget {
  id: string;
  month: string;
  total: number;
  ledgerId: string;
}

export interface BudgetCategory {
  id: string;
  budgetId: string;
  category: Category;
  limitAmount: number;
}

export interface DashboardData {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  budgetUsagePercent: number;
  transactions: Transaction[];
  categorySpending: Record<string, number>;
  dailySpending: { date: string; amount: number }[];
}
