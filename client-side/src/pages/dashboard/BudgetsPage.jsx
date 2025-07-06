import React from 'react';
import { Card } from '../../components/common/Card';
import { BudgetForm } from '../../components/forms/BudgetForm';
import { useExpenseContext } from '../../contexts/ExpenseContext';
import { categoryColors } from '../../data/mockData';

export const BudgetsPage = () => {
  const { budgets } = useExpenseContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
        <p className="text-gray-600">Set and track your spending limits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Budgets</h2>
            <div className="space-y-6">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.amount) * 100;
                const isOverBudget = percentage > 100;
                const remaining = budget.amount - budget.spent;
                
                return (
                  <div key={budget.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: categoryColors[budget.category] }}
                        />
                        <h3 className="font-medium text-gray-900">{budget.category}</h3>
                        <span className="text-sm text-gray-500 capitalize">({budget.period})</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                        </p>
                        <p className={`text-sm ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${Math.abs(remaining).toFixed(2)} {remaining >= 0 ? 'remaining' : 'over budget'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            isOverBudget ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {budgets.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No budgets set yet</p>
                  <p className="text-sm text-gray-400">Create your first budget to start tracking</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div>
          <BudgetForm />
        </div>
      </div>
    </div>
  );
};