package com.tracker.expense_tracker.Service;

import com.tracker.expense_tracker.Dao.LoginDao;
import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.Model.User;


import java.util.List;

public interface UserService {
    public String signup(SignUpDao sign);
    public List<User> getUser();
    public String login(LoginDao login);
    public String deleteAll();
}
