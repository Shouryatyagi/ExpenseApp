package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Model.Expense;
import com.tracker.expense_tracker.Repo.ExpenseRepo;
import com.tracker.expense_tracker.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    @Override
    public String addExpense(ExpenseDao dao) {
        try {
            Expense expense = new Expense();
            expense.setUserId(dao.getUserId());
            expense.setAmount(dao.getAmount());
            expense.setDescription(dao.getDescription());
            expense.setCategory(dao.getCategory());
            expense.setPaymentMethod(dao.getPaymentMethod());
            expense.setDate(dao.getDate());
            expense.setLocation(dao.getLocation());
            expense.setCreatedAt(LocalDateTime.now());
            expense.setUpdatedAt(LocalDateTime.now());

            expenseRepo.save(expense);
            return "Expense added successfully";
        } catch (Exception e) {
            throw new RuntimeException("Failed to add expense: " + e.getMessage());
        }
    }
}
