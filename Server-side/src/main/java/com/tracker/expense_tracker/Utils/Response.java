package com.tracker.expense_tracker.Utils;

import lombok.Data;

@Data
public class Response {
    private String status;
    private Integer statusCode;
    private String message;
    private Object response;
}
