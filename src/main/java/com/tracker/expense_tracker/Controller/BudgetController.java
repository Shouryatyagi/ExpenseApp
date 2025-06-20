package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    //Add Budget
    @PostMapping("/add-budget")
    public String addBudget(@RequestBody BudgetDao budgetDao) {
        return budgetService.addBudget(budgetDao);

    }
}
