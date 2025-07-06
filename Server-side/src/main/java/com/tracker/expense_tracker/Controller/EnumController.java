package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Model.Expense;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/enums")
@CrossOrigin(origins = "http://localhost:3000") // Adjust to your frontend origin
public class EnumController {

    @GetMapping("/categories")
    public List<Expense.Category> getCategories() {
        return Arrays.asList(Expense.Category.values());
    }

    @GetMapping("/payment-methods")
    public List<Expense.PaymentMethod> getPaymentMethods() {
        return Arrays.asList(Expense.PaymentMethod.values());
    }

}
