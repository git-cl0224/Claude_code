import { Transaction, Ledger, Budget, BudgetCategory, Category } from '../types';

const CATEGORIES: Category[] = ['餐饮', '交通', '购物', '娱乐', '住房', '医疗', '教育', '其他'];

const CATEGORY_ICONS: Record<Category, string> = {
  '餐饮': '🍽️',
  '交通': '🚗',
  '购物': '🛍️',
  '娱乐': '🎬',
  '住房': '🏠',
  '医疗': '🏥',
  '教育': '📚',
  '其他': '📦',
};

// Mock data for development
export const mockLedgers: Ledger[] = [
  { id: '1', name: '个人日常', icon: '👤', userId: 'user1' },
  { id: '2', name: '家庭', icon: '👨‍👩‍👧', userId: 'user1' },
  { id: '3', name: '旅行', icon: '✈️', userId: 'user1' },
  { id: '4', name: '生意', icon: '💼', userId: 'user1' },
];

export const mockTransactions: Transaction[] = [
  { id: '1', amount: 45.5, type: 'expense', category: '餐饮', note: '午餐', date: '2025-01-10', ledgerId: '1' },
  { id: '2', amount: 120, type: 'expense', category: '交通', note: '加油', date: '2025-01-09', ledgerId: '1' },
  { id: '3', amount: 299, type: 'expense', category: '购物', note: '衣服', date: '2025-01-08', ledgerId: '1' },
  { id: '4', amount: 80, type: 'expense', category: '娱乐', note: '电影票', date: '2025-01-07', ledgerId: '1' },
  { id: '5', amount: 3500, type: 'expense', category: '住房', note: '房租', date: '2025-01-05', ledgerId: '1' },
  { id: '6', amount: 5000, type: 'income', category: '其他', note: '工资', date: '2025-01-01', ledgerId: '1' },
  { id: '7', amount: 35.8, type: 'expense', category: '餐饮', note: '晚餐外卖', date: '2025-01-10', ledgerId: '1' },
  { id: '8', amount: 150, type: 'expense', category: '医疗', note: '买药', date: '2025-01-06', ledgerId: '1' },
  { id: '9', amount: 200, type: 'expense', category: '教育', note: '书籍', date: '2025-01-04', ledgerId: '1' },
  { id: '10', amount: 68, type: 'expense', category: '餐饮', note: '咖啡', date: '2025-01-03', ledgerId: '1' },
];

export const mockBudget: Budget = {
  id: '1',
  month: '2025-01',
  total: 8000,
  ledgerId: '1',
};

export const mockBudgetCategories: BudgetCategory[] = [
  { id: '1', budgetId: '1', category: '餐饮', limitAmount: 1500 },
  { id: '2', budgetId: '1', category: '交通', limitAmount: 800 },
  { id: '3', budgetId: '1', category: '购物', limitAmount: 1200 },
  { id: '4', budgetId: '1', category: '娱乐', limitAmount: 500 },
  { id: '5', budgetId: '1', category: '住房', limitAmount: 3500 },
  { id: '6', budgetId: '1', category: '医疗', limitAmount: 300 },
  { id: '7', budgetId: '1', category: '教育', limitAmount: 500 },
  { id: '8', budgetId: '1', category: '其他', limitAmount: 200 },
];

export { CATEGORIES, CATEGORY_ICONS };
