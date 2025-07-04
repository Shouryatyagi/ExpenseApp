package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.SignUpDao;
import com.tracker.expense_tracker.Dao.LoginDao;
import com.tracker.expense_tracker.Model.User;
import com.tracker.expense_tracker.Projections.UserLoginProjection;
import com.tracker.expense_tracker.Repo.UserRepo;
import com.tracker.expense_tracker.Service.UserService;
import com.tracker.expense_tracker.Utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String signup(SignUpDao userEntry){
        try {
            // Step 1: Get user by email
            User user = userRepo.findByEmail(userEntry.getEmail());

            // Step 2: Check if user exists
            if (ObjectUtils.isEmpty(user)) {
                user = new User();
                user.setName(userEntry.getName());
                user.setEmail(userEntry.getEmail());

                String plainPassword = userEntry.getPassword();
                String hashedPassword = passwordEncoder.encode(plainPassword);
                user.setPassword(hashedPassword);
                userRepo.save(user);
                return "Signup Successfully";
            }
            else{
                return "User already exists!";
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public ResponseEntity<Response> login(LoginDao userEntry) {
        Response response = new Response();
        try {
            User user = userRepo.findByEmail(userEntry.getEmail());
            if(!ObjectUtils.isEmpty(user)){
                UserLoginProjection userProj = new UserLoginProjection();
                if (passwordEncoder.matches(userEntry.getPassword(), user.getPassword())) {
                    userProj.setName(user.getName());
                    userProj.setEmail(user.getEmail());
                    response = handleApiResponse("Successful",200,"Successfully login",userProj);
                }
                else {
                    response = handleApiResponse("Unsuccessful", 401, "Invalid password", null);
                }
            }
            else{
                response = handleApiResponse("Unsuccessful",404,"User not found", null);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response = handleApiResponse("Unsuccessful",500,e.getMessage(),null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<User> getUser(){
        List<User> user = userRepo.findAll();
        return user;
    }

    public String deleteAll(){
        List<User> user = userRepo.findAll();
        try {
            if(!ObjectUtils.isEmpty(user)){
                userRepo.deleteAll();
                return "Successfully deleted";
            }
            else{
                return "No user found";
            }
        } catch (Exception e) {
            throw new RuntimeException("Error during login: " + e.getMessage());
        }

    }

    public String getId(String email){
        User user = userRepo.findByEmail(email);
        String result = user.getId().toString();
        return result;
    }


    public Response handleApiResponse(String status, Integer statusCode, String message, Object response){
        Response res = new Response();
        res.setStatus(status);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResponse(response);
        return res;
    }
}
