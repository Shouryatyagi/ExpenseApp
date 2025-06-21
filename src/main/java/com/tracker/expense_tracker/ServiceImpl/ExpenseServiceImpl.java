package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Model.Expense;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.Repo.ExpenseRepo;
import com.tracker.expense_tracker.Repo.UserRepo;
import com.tracker.expense_tracker.Service.ExpenseService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.List;
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
            expense.setUserId(dao.getUserId());
            expense.setAmount(dao.getAmount());
            expense.setDescription(dao.getDescription());
            expense.setCategory(dao.getCategory());
            expense.setPaymentMethod(dao.getPaymentMethod());
            expense.setDate(dao.getDate());
            expense.setLocation(dao.getLocation());
            Expense savedExpense = expenseRepo.save(expense);

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

    @Override
    public Expense getExpense(ObjectId id){
        Optional<Expense> expense = expenseRepo.findById(id);
        return expense.get();
    }

    public List<Expense> getAllExpense(ObjectId userId){
        Optional<User> user = userRepo.findById(userId);
        List<Expense> result = user.get().getExpense();
        return result;
    }

    public String deleteAll(ObjectId userId){
        Optional<User> user = userRepo.findById(userId);
        try {
            if(!ObjectUtils.isEmpty(user.get())){
                user.get().getExpense().clear();
                return "Successfully deleted";
            }
            else{
                return "No user found";
            }
        } catch (Exception e) {
            throw new RuntimeException("Error during login: " + e.getMessage());
        }
    }

    public Expense updateExpense(ExpenseDao u,ObjectId id){
        Optional<Expense> expense = expenseRepo.findById(id);
        if(!ObjectUtils.isEmpty(u.getAmount())){
            expense.get().setAmount(u.getAmount());
        }
        if(!ObjectUtils.isEmpty(u.getDate())){
            expense.get().setDate(u.getDate());
        }
        if(!ObjectUtils.isEmpty(u.getCategory())){
            expense.get().setCategory(u.getCategory());
        }
        if(!ObjectUtils.isEmpty(u.getDescription())){
            expense.get().setDescription(u.getDescription());
        }
        if(!ObjectUtils.isEmpty(u.getLocation())){
            expense.get().setLocation(u.getLocation());
        }
        if(!ObjectUtils.isEmpty(u.getPaymentMethod())){
            expense.get().setPaymentMethod(u.getPaymentMethod());
        }
        Expense saved = expenseRepo.save(expense.get());
        return saved;
    }
}
