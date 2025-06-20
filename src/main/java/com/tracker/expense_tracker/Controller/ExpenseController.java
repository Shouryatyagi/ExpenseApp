package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Service.BudgetService;
import com.tracker.expense_tracker.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/expense")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    // Add Expense
    @PostMapping("/add-expense")
    public String addExpense(@RequestBody ExpenseDao expenseDao) {
        return expenseService.addExpense(expenseDao);
    }

}

