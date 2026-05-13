import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getMonthProgress(): number {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  return (currentDay / daysInMonth) * 100;
}

export function calculateBudgetStatus(spent: number, budget: number): {
  percent: number;
  status: 'normal' | 'warning' | 'danger';
} {
  const percent = (spent / budget) * 100;
  let status: 'normal' | 'warning' | 'danger' = 'normal';
  
  if (percent >= 100) {
    status = 'danger';
  } else if (percent >= 80) {
    status = 'warning';
  }
  
  return { percent, status };
}
