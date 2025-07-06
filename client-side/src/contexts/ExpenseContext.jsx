import React, { createContext, useContext } from 'react';
import { useExpenses } from '../hooks/useExpenses';

const ExpenseContext = createContext(undefined);

export const ExpenseProvider = ({ children }) => {
  const expenses = useExpenses();
  
  return (
    <ExpenseContext.Provider value={expenses}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};