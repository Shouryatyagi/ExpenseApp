package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Service.BudgetService;
import com.tracker.expense_tracker.Model.Budget;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense-app")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/save-update-budget")
    public ResponseEntity<?> saveOrUpdateBudget(@RequestBody BudgetDao dao) {
        Budget budget = budgetService.saveOrUpdateBudget(dao);
        return ResponseEntity.ok(budget);
    }

    @PostMapping("/get-budget")
    public ResponseEntity<?> getBudget(@RequestBody BudgetDao dao) {
        try {
            ObjectId objectId = new ObjectId(dao.getUserId());
            Integer month = dao.getMonth();
            Integer year = dao.getYear();

            if (month == null || year == null) {
                return ResponseEntity.badRequest().body("Month and year are required.");
            }

            Budget budget = budgetService.getBudget(objectId, month, year);
            if (budget == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(budget);

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Invalid userId format");
        }
    }

}
