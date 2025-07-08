package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Dao.LoginDao;
import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.ServiceImpl.UserServiceImpl;
import com.tracker.expense_tracker.Utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Service.BudgetService;
import com.tracker.expense_tracker.Dao.ExpenseDao;
import com.tracker.expense_tracker.Service.ExpenseService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Allow frontend access
@RequestMapping("/expense-app")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    //SignUp
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpDao userEntry){
        try{
            String message = userServiceImpl.signup(userEntry);

            // Wrap the message in a proper object
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of("message", message));

        } catch(Exception e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Something went wrong"));
        }
    }


    //Get all users stored in DB
    @GetMapping("/get-users")
    public ResponseEntity<?> getUsers(){
        try{
            List<User> user = userServiceImpl.getUser();
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST) ;
        }
    }

//    //Login
//    @PostMapping("/login")
//    public ResponseEntity<Response> login(@RequestBody LoginDao userEntry){
//        return userServiceImpl.login(userEntry);
//    }

    //Delete all users stored in DB
    @GetMapping("/deleteallusers")
    public ResponseEntity<?> deleteAll(){
        try{
            String message = userServiceImpl.deleteAll();
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/getId/{email}")
    public String getId(@PathVariable String email){
        String result = userServiceImpl.getId(email);
        return result;
    }
}
