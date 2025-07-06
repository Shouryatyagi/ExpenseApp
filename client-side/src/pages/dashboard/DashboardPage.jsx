import React, { useMemo } from 'react';
import { Card } from '../../components/common/Card';
import { useExpenseContext } from '../../contexts/ExpenseContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { DollarSign, TrendingUp, PieChart, AlertCircle } from 'lucide-react';
import { categoryColors } from '../../data/mockData';

export const DashboardPage = () => {
  const { expenses, budgets } = useExpenseContext();
  const { user } = useAuthContext();

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const categorySpending = monthlyExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const categoryEntries = Object.entries(categorySpending);
    const topCategory = categoryEntries.length > 0 
      ? categoryEntries.reduce((a, b) => 
          categorySpending[a[0]] > categorySpending[b[0]] ? a : b
        )[0]
      : 'No expenses';

    return {
      totalExpenses,
      monthlyExpenses: monthlyTotal,
      budgetUtilization,
      topCategory,
      recentExpenses: expenses.slice(0, 5),
      categorySpending
    };
  }, [expenses, budgets]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.monthlyExpenses.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.budgetUtilization.toFixed(1)}%
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <PieChart className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.topCategory}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h2>
          <div className="space-y-3">
            {stats.recentExpenses.map((expense) => (
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
                  <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            
            {stats.recentExpenses.length === 0 && (
              <p className="text-gray-500 text-center py-8">No expenses yet</p>
            )}
          </div>
        </Card>

        {/* Budget Overview */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Overview</h2>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.amount) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">{budget.category}</span>
                    <span className="text-sm text-gray-500">
                      ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isOverBudget ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
            
            {budgets.length === 0 && (
              <p className="text-gray-500 text-center py-8">No budgets set yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};