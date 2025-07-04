package com.tracker.expense_tracker.Service;

import com.tracker.expense_tracker.Dao.LoginDao;
import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.Utils.Response;
import org.springframework.http.ResponseEntity;


import java.util.List;

public interface UserService {
    public String signup(SignUpDao sign);
    public List<User> getUser();
    public ResponseEntity<Response> login(LoginDao userEntry);
    public String deleteAll();
    public String getId(String email);
}
