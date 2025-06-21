package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Model.Expense;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.Service.BudgetService;
import com.tracker.expense_tracker.Service.ExpenseService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// /expense/add-expense - creating new expense entry
// /get-expense/{id}-expense - get the expense for particular id
// /get-all-expense/{userId} -expense - get all the expense for particular userId
// /delete-all-expense/{userId} - delete all the expenses for a user
// /update-expense/{id} - expense - update expense by id

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    // Add Expense
    @PostMapping("/add-expense")
    public ResponseEntity<?> addExpense(@RequestBody ExpenseDao expenseDao) {
        try{
            String message = expenseService.addExpense(expenseDao);
            return new ResponseEntity<>(message, HttpStatus.CREATED);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    @GetMapping("/get-expense/{id}")
    public ResponseEntity<?> getExpense(@PathVariable ObjectId id){
        try{
            Expense expense = expenseService.getExpense(id);
            return new ResponseEntity<>(expense, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    @GetMapping("/get-all-expense/{userId}")
    public ResponseEntity<?> getAllExpense(@PathVariable ObjectId userId){
        try{
            List<Expense> expenselist = expenseService.getAllExpense(userId);
            return new ResponseEntity<>(expenselist, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    @DeleteMapping("/delete-all-expense/{userId}")
    public ResponseEntity<?> deleteAllExpense(@PathVariable ObjectId userId){
        try{
            String message = expenseService.deleteAll(userId);
            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    @PostMapping("/update-expense/{id}")
    public ResponseEntity<?> updateExpense(@RequestBody ExpenseDao updateDao, @PathVariable ObjectId id) {
        try{
            Expense expense = expenseService.updateExpense(updateDao,id);
            return new ResponseEntity<>(expense, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

}

