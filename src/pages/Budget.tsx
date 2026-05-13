import React, { useState } from 'react';
import { useLedgers, useBudget } from '../hooks/useData';
import { Card, Button, Input } from '../components/ui';
import { formatCurrency } from '../lib/utils';
import { BudgetCategory } from '../types';
import { CATEGORIES, CATEGORY_ICONS } from '../data/mockData';
import { Save } from 'lucide-react';

export function BudgetPage() {
  const { currentLedgerId } = useLedgers();
  const { budget, budgetCategories, updateBudget } = useBudget(currentLedgerId);
  
  const [totalBudget, setTotalBudget] = useState(budget?.total.toString() || '');
  const [categoryLimits, setCategoryLimits] = useState<Record<string, string>>(
    budgetCategories.reduce((acc, bc) => ({
      ...acc,
      [bc.category]: bc.limitAmount.toString(),
    }), {})
  );

  const handleSaveTotal = () => {
    const value = parseFloat(totalBudget);
    if (value > 0) {
      updateBudget({ total: value });
      alert('总预算已保存');
    }
  };

  const handleSaveCategory = (category: string) => {
    const value = parseFloat(categoryLimits[category] || '0');
    // In a real app, this would save to the database
    alert(`${category} 分类预算已保存：${formatCurrency(value)}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">预算设置</h1>

      {/* Total Budget */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">月度总预算</h3>
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="输入总预算金额"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSaveTotal}>
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </div>
        {budget && (
          <p className="text-sm text-gray-500 mt-2">
            当前预算：{formatCurrency(budget.total)}
          </p>
        )}
      </Card>

      {/* Category Budgets */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">分类子预算</h3>
        
        <div className="space-y-4">
          {CATEGORIES.map(category => {
            const existingBudget = budgetCategories.find(bc => bc.category === category);
            
            return (
              <div key={category} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <span className="text-xl w-8 text-center">
                  {CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}
                </span>
                
                <span className="font-medium text-gray-700 flex-1">
                  {category}
                </span>
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="限额"
                    value={categoryLimits[category] || ''}
                    onChange={(e) => setCategoryLimits(prev => ({
                      ...prev,
                      [category]: e.target.value,
                    }))}
                    className="w-28 px-3 py-2 border border-gray-200 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleSaveCategory(category)}
                  >
                    保存
                  </Button>
                </div>
                
                {existingBudget && (
                  <span className="text-xs text-gray-500 w-20 text-right">
                    当前：{formatCurrency(existingBudget.limitAmount)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <h4 className="font-semibold text-primary mb-2">💡 预算设置建议</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 总预算建议设置为月收入的 70-80%</li>
          <li>• 住房预算控制在总预算的 30% 以内</li>
          <li>• 餐饮预算可设为总预算的 20-25%</li>
          <li>• 预留 10% 作为应急备用金</li>
        </ul>
      </Card>
    </div>
  );
}
