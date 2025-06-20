package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Model.Budget;
import com.tracker.expense_tracker.Repo.BudgetRepo;
import com.tracker.expense_tracker.Service.BudgetService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BudgetServiceImpl implements BudgetService {
    @Autowired
    private BudgetRepo budgetRepo;

    @Override
    public String addBudget(BudgetDao budgetDao) {
        try {
            Budget budget = new Budget();
            budget.setUserId(budgetDao.getUserId());
            budget.setCategory(budgetDao.getCategory());
            budget.setAmount(budgetDao.getAmount());
            budget.setMonth(budgetDao.getMonth());
            budget.setYear(budgetDao.getYear());
            budget.setCreatedAt(LocalDateTime.now());
            budget.setUpdatedAt(LocalDateTime.now());

            budgetRepo.save(budget);
            return "Budget saved successfully";
        } catch (Exception e) {
            throw new RuntimeException("Failed to save budget: " + e.getMessage());
        }
    }
}
