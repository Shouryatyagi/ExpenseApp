package com.tracker.expense_tracker.Dao;

import com.tracker.expense_tracker.Model.Expense;
import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ExpenseDao {
    private ObjectId userId;
    private BigDecimal amount;
    private String description;
    private Expense.Category category;
    private Expense.PaymentMethod paymentMethod;
    private LocalDateTime date;
    private String location;
}
