package com.tracker.expense_tracker.Repo;

import com.tracker.expense_tracker.Model.Budget;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BudgetRepo extends MongoRepository<Budget, ObjectId> {
    // You can define custom queries later, like findByUserId
}
