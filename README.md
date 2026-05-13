# 智能记账 - Smart Budget Tracker

基于 Vite + React + TypeScript 构建的个人预算管理应用。

## 功能特性

- 📊 **首页仪表盘** - 月度预算进度、本月概览、快速记账、分类消费排行
- ➕ **记账录入** - 手动记账表单，支持收入/支出切换，8 个消费分类
- 📈 **数据看板** - 饼图、折线图、柱状图可视化分析
- 🤖 **AI 分析** - 超预算自动分析，生成个性化省钱建议
- ⚙️ **预算设置** - 总预算 + 各分类子预算管理
- 📒 **多账本** - 个人日常、家庭、旅行、生意多账本管理

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 8
- **路由**: React Router v7
- **状态管理**: TanStack Query
- **UI**: Tailwind CSS + Lucide Icons
- **图表**: Recharts
- **工具库**: date-fns, clsx, tailwind-merge

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/     # 可复用组件
│   ├── ui.tsx             # 基础 UI 组件
│   ├── Navigation.tsx     # 导航组件
│   ├── TransactionForm.tsx # 记账表单
│   └── DashboardCards.tsx # 仪表盘卡片
├── pages/          # 页面组件
│   ├── Home.tsx           # 首页
│   ├── Add.tsx            # 记账页
│   ├── Dashboard.tsx      # 数据看板
│   ├── Analysis.tsx       # AI 分析
│   └── Budget.tsx         # 预算设置
├── hooks/          # 自定义 Hooks
│   └── useData.ts         # 数据相关 hooks
├── lib/            # 工具函数
│   └── utils.ts           # 通用工具
├── types/          # TypeScript 类型
│   └── index.ts           # 类型定义
└── data/           # Mock 数据
    └── mockData.ts        # 模拟数据
```

## 设计规范

- **主题**: 浅色主题，蓝绿色系 (#0EA5E9)
- **圆角**: rounded-2xl (1rem) / rounded-xl (0.75rem)
- **预警色**: 橙黄 (80%) / 红 (100%)
- **布局**: 移动端优先，响应式设计
- **导航**: 底部导航栏（移动）/ 侧边栏（桌面）

## License

ISC
