package com.tracker.expense_tracker.Repo;

import com.tracker.expense_tracker.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {

    // This method is used by UserDetailsService for login
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
    // Add other queries if needed (e.g., findByEmail, etc.)
}
