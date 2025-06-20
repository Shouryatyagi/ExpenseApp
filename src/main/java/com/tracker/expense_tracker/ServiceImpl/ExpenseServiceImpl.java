package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Model.Expense;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.Repo.ExpenseRepo;
import com.tracker.expense_tracker.Repo.UserRepo;
import com.tracker.expense_tracker.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private UserRepo userRepo;

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
            expenseRepo.save(expense);

            Optional<User> optionalUser = userRepo.findById(dao.getUserId());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get(); // Get actual User object
                user.getExpense().add(expense); // Add expense to user's list
                userRepo.save(user);            // Save updated user
            }
            return "Expense added successfully";
        } catch (Exception e) {
            throw new RuntimeException("Failed to add expense: " + e.getMessage());
        }
    }
}
