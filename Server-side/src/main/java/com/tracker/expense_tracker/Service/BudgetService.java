package com.tracker.expense_tracker.Service;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Model.Budget;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.RequestBody;


public interface BudgetService {
    Budget saveOrUpdateBudget(BudgetDao dao);
    Budget getBudget( BudgetDao dao);
}
