import React, { useState } from 'react';
import { useLedgers, useDashboardData } from '../hooks/useData';
import { Card, Button } from '../components/ui';
import { formatCurrency } from '../lib/utils';
import { Brain, TrendingDown, Lightbulb, Target, Sparkles } from 'lucide-react';

interface AnalysisMessage {
  type: 'analysis' | 'suggestion' | 'tip';
  content: string;
  icon?: React.ReactNode;
}

export function AnalysisPage() {
  const { currentLedgerId } = useLedgers();
  const { data, loading } = useDashboardData(currentLedgerId);
  const [analyzing, setAnalyzing] = useState(false);
  const [messages, setMessages] = useState<AnalysisMessage[]>([]);

  const runAnalysis = () => {
    setAnalyzing(true);
    setMessages([]);

    // Simulate AI analysis with mock data
    setTimeout(() => {
      const analysis: AnalysisMessage[] = [];

      if (data && data.totalSpent > data.totalBudget) {
        // Over budget analysis
        const overAmount = data.totalSpent - data.totalBudget;
        
        analysis.push({
          type: 'analysis',
          icon: <Brain className="w-5 h-5 text-primary" />,
          content: `检测到您本月已超预算 ${formatCurrency(overAmount)}。让我为您分析原因...`,
        });

        // Find top spending category
        const sortedCategories = Object.entries(data.categorySpending)
          .sort(([, a], [, b]) => b - a);
        
        if (sortedCategories.length > 0) {
          const [topCategory, topAmount] = sortedCategories[0];
          analysis.push({
            type: 'analysis',
            content: `主要超支来自「${topCategory}」类别，支出 ${formatCurrency(topAmount)}，占总支出的 ${((topAmount / data.totalSpent) * 100).toFixed(1)}%。`,
          });
        }

        // Generate suggestions
        analysis.push({
          type: 'suggestion',
          icon: <Lightbulb className="w-5 h-5 text-warning" />,
          content: '💡 省钱建议：',
        });

        analysis.push({
          type: 'tip',
          content: '• 尝试减少外卖频次，自己做饭可节省约 30% 餐饮支出',
        });

        analysis.push({
          type: 'tip',
          content: '• 设置购物冷静期，24 小时后再决定是否购买非必需品',
        });

        analysis.push({
          type: 'tip',
          content: `• 为「${sortedCategories[0]?.[0] || '消费'}」设置更严格的子预算限额`,
        });

        analysis.push({
          type: 'suggestion',
          icon: <Target className="w-5 h-5 text-success" />,
          content: `📊 下月建议预算：${formatCurrency(data.totalSpent * 0.85)}（降低 15%）`,
        });

      } else if (data) {
        // Normal budget analysis
        const remainingPercent = ((data.remainingBudget / data.totalBudget) * 100).toFixed(1);
        
        analysis.push({
          type: 'analysis',
          icon: <Sparkles className="w-5 h-5 text-success" />,
          content: `恭喜！您的预算执行情况良好，剩余 ${remainingPercent}% 的预算。`,
        });

        analysis.push({
          type: 'tip',
          content: '继续保持当前的消费习惯，建议将结余部分存入储蓄账户。',
        });
      }

      setMessages(analysis);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">AI 智能分析</h1>

      {!loading && data && (
        <Card className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {data.totalSpent > data.totalBudget ? '超预算预警' : '预算执行正常'}
          </h3>
          
          <p className="text-gray-500 mb-6">
            {data.totalSpent > data.totalBudget 
              ? 'AI 将分析您的消费模式，找出超支原因并提供个性化建议'
              : '点击生成财务分析报告，获取优化建议'
            }
          </p>

          <Button 
            onClick={runAnalysis} 
            disabled={analyzing}
            size="lg"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                分析中...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                开始分析
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Analysis Results - Chat-style UI */}
      {messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.type === 'suggestion' ? 'flex-row-reverse' : ''}`}
            >
              {msg.icon && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {msg.icon}
                </div>
              )}
              
              <Card className={`flex-1 ${msg.type === 'suggestion' ? 'bg-primary/5 border-primary/20' : ''}`}>
                <p className={msg.type === 'tip' ? 'text-gray-600' : 'text-gray-900'}>
                  {msg.content}
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
