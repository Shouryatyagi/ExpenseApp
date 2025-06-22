package com.tracker.expense_tracker.Repo;

import com.tracker.expense_tracker.Model.Expense;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseAppRepo extends MongoRepository<Expense, ObjectId> {
}
