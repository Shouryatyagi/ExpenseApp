import React from 'react';
import { ExpenseForm } from '../../components/forms/ExpenseForm';

export const AddExpensePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add Expense</h1>
        <p className="text-gray-600">Record a new expense to track your spending</p>
      </div>
      
      <ExpenseForm />
    </div>
  );
};