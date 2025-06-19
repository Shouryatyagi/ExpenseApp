package com.tracker.expense_tracker.Controller;


import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.ServiceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense")
public class ExpenseAppController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpDao userEntry){
        String message = userServiceImpl.signup(userEntry);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
