package com.tracker.expense_tracker.Repo;

import com.tracker.expense_tracker.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, ObjectId> {

}
