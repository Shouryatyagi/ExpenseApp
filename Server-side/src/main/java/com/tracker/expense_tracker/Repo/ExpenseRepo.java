package com.tracker.expense_tracker.Repo;

import com.tracker.expense_tracker.Model.Expense;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExpenseRepo extends MongoRepository<Expense, ObjectId> {
    List<Expense> findByUserId(ObjectId userId); // Optional: fetch expenses by user
}
