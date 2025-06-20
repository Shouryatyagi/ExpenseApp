package com.tracker.expense_tracker.Dao;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class BudgetDao {

    private ObjectId userId;
    private String category;
    private Double amount;
    private Integer month;
    private Integer year;
}
