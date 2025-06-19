package com.tracker.expense_tracker.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "budget")
@Data
@NoArgsConstructor
public class Budget {
    @Id
    private ObjectId bid;
    @NonNull
    private ObjectId userId;
    private String category;
    private Double amount;
    private Integer month;
    private Integer year;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}

