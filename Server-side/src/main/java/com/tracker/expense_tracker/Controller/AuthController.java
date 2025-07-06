package com.tracker.expense_tracker.Controller;

import com.tracker.expense_tracker.Config.JWTUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/expense-app")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }
        String username = authentication.getName(); // Or get more from UserDetails
        return ResponseEntity.ok(Map.of("username", username));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("Trying login with: " + request.getUsername());

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()
                    )
            );
            System.out.println("✅ Auth success");
        } catch (AuthenticationException e) {
            System.out.println("❌ Auth failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }


    public static class AuthRequest {
        private String username;
        private String password;

        public AuthRequest() {}  // Required by Jackson

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @Data
    @AllArgsConstructor
    class AuthResponse {
        private String token;
    }
}
