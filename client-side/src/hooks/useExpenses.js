import { useState, useEffect } from 'react';
import { mockExpenses, mockBudgets } from '../data/mockData';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Load initial data
    setExpenses(mockExpenses);
    setBudgets(mockBudgets);
  }, []);

  const addExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: Date.now().toString(),
      userId: '1',
      createdAt: new Date().toISOString()
    };
    
    setExpenses(prev => [newExpense, ...prev]);
    
    // Update budget spent amount
    setBudgets(prev => prev.map(budget => 
      budget.category === expenseData.category
        ? { ...budget, spent: budget.spent + expenseData.amount }
        : budget
    ));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...updatedData } : expense
    ));
  };

  const deleteExpense = (id) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setExpenses(prev => prev.filter(e => e.id !== id));
      
      // Update budget spent amount
      setBudgets(prev => prev.map(budget => 
        budget.category === expense.category
          ? { ...budget, spent: Math.max(0, budget.spent - expense.amount) }
          : budget
      ));
    }
  };

  const addBudget = (budgetData) => {
    const newBudget = {
      ...budgetData,
      id: Date.now().toString(),
      userId: '1',
      spent: 0,
      createdAt: new Date().toISOString()
    };
    
    setBudgets(prev => [...prev, newBudget]);
  };

  const updateBudget = (id, updatedData) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id ? { ...budget, ...updatedData } : budget
    ));
  };

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  return {
    expenses,
    budgets,
    addExpense,
    updateExpense,
    deleteExpense,
    addBudget,
    updateBudget,
    deleteBudget
  };
};