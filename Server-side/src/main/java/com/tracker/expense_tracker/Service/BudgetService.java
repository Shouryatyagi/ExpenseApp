package com.tracker.expense_tracker.Service;

import com.tracker.expense_tracker.Model.Budget;
import org.bson.types.ObjectId;
import com.tracker.expense_tracker.Dao.BudgetDao;
public interface BudgetService {
    String addBudget(BudgetDao budgetDao);
    Budget getBudget(ObjectId userId);
    void updateBudget(ObjectId userId, BudgetDao budgetDao);
    void deleteBudget(ObjectId userId);

}
