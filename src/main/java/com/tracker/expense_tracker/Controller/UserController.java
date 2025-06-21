package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Dao.LoginDao;
import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.ServiceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Service.BudgetService;
import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/expense")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    //SignUp
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpDao userEntry){
        try{
            String message = userServiceImpl.signup(userEntry);
            return new ResponseEntity<>(message, HttpStatus.CREATED);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    //Get all users stored in DB
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        try{
            List<User> user = userServiceImpl.getUser();
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    //Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDao userEntry){
        try{
            String message = userServiceImpl.login(userEntry);
            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

    //Delete all users stored in DB
    @GetMapping("deleteAllUser")
    public ResponseEntity<?> deleteAll(){
        try{
            String message = userServiceImpl.deleteAll();
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
