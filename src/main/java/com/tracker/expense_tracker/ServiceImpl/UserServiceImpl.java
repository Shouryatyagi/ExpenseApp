package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.Repo.UserRepo;
import com.tracker.expense_tracker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    public String signup(SignUpDao userEntry){
        try {
            User user = new User();
            user.setName(userEntry.getName());
            user.setEmail(userEntry.getEmail());
            user.setPassword(userEntry.getPassword());

            userRepo.save(user);
            return "Signup Succesfully";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<User> getUser(){
        List<User> user = userRepo.findAll();
        return user;
    }
}
