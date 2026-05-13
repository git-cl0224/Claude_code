import React from 'react';
import { useLedgers, useDashboardData } from '../hooks/useData';
import { Card } from '../components/ui';
import { formatCurrency } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { CATEGORY_ICONS } from '../data/mockData';

const COLORS = ['#0EA5E9', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

export function DashboardPage() {
  const { currentLedgerId } = useLedgers();
  const { data, loading } = useDashboardData(currentLedgerId);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Prepare pie chart data
  const pieData = Object.entries(data.categorySpending).map(([name, value]) => ({
    name,
    value,
    icon: CATEGORY_ICONS[name as keyof typeof CATEGORY_ICONS],
  }));

  // Prepare line chart data (daily spending)
  const lineData = data.dailySpending.map(d => ({
    date: d.date.slice(5), // MM-DD format
    amount: d.amount,
  }));

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">数据看板</h1>

      {/* Category Distribution Pie Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">分类占比</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Daily Spending Trend */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">支出趋势</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ fill: '#0EA5E9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Comparison Bar Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">分类消费对比</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="value" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-sm text-gray-500 mb-1">总支出</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(data.totalSpent)}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500 mb-1">预算</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(data.totalBudget)}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500 mb-1">剩余</p>
          <p className="text-xl font-bold text-success">{formatCurrency(data.remainingBudget)}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500 mb-1">执行率</p>
          <p className="text-xl font-bold text-primary">{data.budgetUsagePercent.toFixed(1)}%</p>
        </Card>
      </div>
    </div>
  );
}
