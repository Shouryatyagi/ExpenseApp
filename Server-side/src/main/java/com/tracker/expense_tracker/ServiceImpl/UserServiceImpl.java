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
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String signup(SignUpDao userEntry) {
        try {
            Optional<User> userOpt = userRepo.findByEmail(userEntry.getEmail());

            if (userOpt.isEmpty()) {
                User newUser = new User();
                newUser.setName(userEntry.getName());
                newUser.setEmail(userEntry.getEmail());
                newUser.setPassword(passwordEncoder.encode(userEntry.getPassword()));
                userRepo.save(newUser);
                return "Signup Successfully";
            } else {
                return "User already exists!";
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<Response> login(LoginDao userEntry) {
        Response response = new Response();
        try {
            Optional<User> userOpt = userRepo.findByEmail(userEntry.getEmail());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                if (passwordEncoder.matches(userEntry.getPassword(), user.getPassword())) {
                    UserLoginProjection userProj = new UserLoginProjection();
                    userProj.setName(user.getName());
                    userProj.setEmail(user.getEmail());
                    response = handleApiResponse("Successful", 200, "Successfully login", userProj);
                } else {
                    response = handleApiResponse("Unsuccessful", 401, "Invalid password", null);
                }
            } else {
                response = handleApiResponse("Unsuccessful", 404, "User not found", null);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response = handleApiResponse("Unsuccessful", 500, e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<User> getUser() {
        return userRepo.findAll();
    }

    public String deleteAll() {
        try {
            List<User> users = userRepo.findAll();
            if (!users.isEmpty()) {
                userRepo.deleteAll();
                return "Successfully deleted";
            } else {
                return "No user found";
            }
        } catch (Exception e) {
            throw new RuntimeException("Error during delete: " + e.getMessage());
        }
    }

    public String getId(String email) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        return userOpt.map(user -> user.getId().toString())
                .orElse("User not found");
    }

    public Response handleApiResponse(String status, Integer statusCode, String message, Object response) {
        Response res = new Response();
        res.setStatus(status);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setResponse(response);
        return res;
    }
}
