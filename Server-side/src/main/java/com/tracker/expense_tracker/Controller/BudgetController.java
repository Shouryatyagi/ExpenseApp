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

    @GetMapping("/get-budget")
    public ResponseEntity<?> getBudget(@RequestParam String userId,
                                       @RequestParam Integer month,
                                       @RequestParam Integer year) {
        try {
            ObjectId objectId = new ObjectId(userId);
            BudgetDao dao = new BudgetDao();
            dao.setUserId(userId);
            dao.setMonth(month);
            dao.setYear(year);

            Budget budget = budgetService.getBudget(dao);

            if (budget == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(budget);

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Invalid userId format");
        }
    }

}
