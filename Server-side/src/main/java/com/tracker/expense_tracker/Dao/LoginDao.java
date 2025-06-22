package com.tracker.expense_tracker.Dao;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LoginDao {
    private String email;
    private String password;
}
