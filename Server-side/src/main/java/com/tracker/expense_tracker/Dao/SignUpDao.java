package com.tracker.expense_tracker.Dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SignUpDao {
    private String name;
    private String email;
    private String password;
}

