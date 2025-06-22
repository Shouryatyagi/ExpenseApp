package com.tracker.expense_tracker.Service;

import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Model.Expense;
import org.bson.types.ObjectId;

import java.util.List;

public interface ExpenseService {
    String addExpense(ExpenseDao expenseDao);
    Expense getExpense(ObjectId id);
    List<Expense> getAllExpense(ObjectId userId);
    String deleteAll(ObjectId userId);
    Expense updateExpense(ExpenseDao updateDao,ObjectId id);
}
