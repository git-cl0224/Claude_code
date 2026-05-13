import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Utensils, Car, ShoppingBag, Film, Home, Heart, Book, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Select } from './ui';
import { cn, formatCurrency, formatDate } from '../lib/utils';
import { Transaction, TransactionType, Category } from '../types';
import { CATEGORY_ICONS, CATEGORIES } from '../data/mockData';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  ledgerId: string;
}

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  '餐饮': Utensils,
  '交通': Car,
  '购物': ShoppingBag,
  '娱乐': Film,
  '住房': Home,
  '医疗': Heart,
  '教育': Book,
  '其他': Package,
};

export function TransactionForm({ onSubmit, ledgerId }: TransactionFormProps) {
  const navigate = useNavigate();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('餐饮');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('请输入有效金额');
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      type,
      category,
      note,
      date,
      ledgerId,
    });

    // Reset form
    setAmount('');
    setNote('');
    navigate('/');
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6">记一笔</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={cn(
              'flex-1 py-2 rounded-lg font-medium transition-colors',
              type === 'expense' 
                ? 'bg-white text-danger shadow-sm' 
                : 'text-gray-500'
            )}
          >
            支出
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={cn(
              'flex-1 py-2 rounded-lg font-medium transition-colors',
              type === 'income' 
                ? 'bg-white text-success shadow-sm' 
                : 'text-gray-500'
            )}
          >
            收入
          </button>
        </div>

        {/* Amount */}
        <Input
          label="金额"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
        />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            分类
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(cat => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'flex flex-col items-center p-3 rounded-xl border transition-all',
                    category === cat
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-100 hover:border-gray-200'
                  )}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date */}
        <Input
          label="日期"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Note */}
        <Input
          label="备注"
          placeholder="可选"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Submit */}
        <Button type="submit" className="w-full" size="lg">
          确认记账
        </Button>
      </form>
    </Card>
  );
}

// Quick add button component for floating action
export function QuickAddButton() {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate('/add')}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-600 transition-colors z-40 active:scale-95"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
