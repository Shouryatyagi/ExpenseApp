package com.tracker.expense_tracker.Repo;

import com.tracker.expense_tracker.Model.Budget;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BudgetRepo extends MongoRepository<Budget, ObjectId> {
    // You can define custom queries later, like findByUserId
    Optional<Budget> findByUserIdAndMonthAndYear(ObjectId userId, int month, int year);
}

