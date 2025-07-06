import React, { useMemo } from 'react';
import { Card } from '../../components/common/Card';
import { useExpenseContext } from '../../contexts/ExpenseContext';
import { categoryColors } from '../../data/mockData';

export const AnalyticsPage = () => {
  const { expenses } = useExpenseContext();

  const analytics = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Category breakdown
    const categorySpending = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Monthly spending over the last 6 months
    const monthlySpending = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentYear, currentMonth - i, 1);
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === month.getMonth() && 
               expenseDate.getFullYear() === month.getFullYear();
      });
      
      monthlySpending.push({
        month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: monthExpenses.reduce((sum, exp) => sum + exp.amount, 0)
      });
    }

    // Top spending categories
    const topCategories = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      categorySpending,
      monthlySpending,
      topCategories,
      totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0)
    };
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Insights into your spending patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Spending by Category</h2>
          <div className="space-y-4">
            {analytics.topCategories.map(([category, amount]) => {
              const percentage = (amount / analytics.totalExpenses) * 100;
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoryColors[category] }}
                      />
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">
                        ${amount.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: categoryColors[category]
                      }}
                    />
                  </div>
                </div>
              );
            })}
            
            {analytics.topCategories.length === 0 && (
              <p className="text-gray-500 text-center py-8">No spending data available</p>
            )}
          </div>
        </Card>

        {/* Spending Summary */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Spending Summary</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Total Expenses</span>
                <span className="text-lg font-bold text-blue-900">
                  ${analytics.totalExpenses.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">Average per Category</span>
                <span className="text-lg font-bold text-green-900">
                  ${analytics.topCategories.length > 0 
                    ? (analytics.totalExpenses / analytics.topCategories.length).toFixed(2)
                    : '0.00'
                  }
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-yellow-700">Top Category</span>
                <span className="text-lg font-bold text-yellow-900">
                  {analytics.topCategories[0]?.[0] || 'None'}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-purple-700">Total Transactions</span>
                <span className="text-lg font-bold text-purple-900">
                  {expenses.length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Trends */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {expenses.slice(0, 10).map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[expense.category] }}
                />
                <div>
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {expenses.length === 0 && (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          )}
        </div>
      </Card>
    </div>
  );
};