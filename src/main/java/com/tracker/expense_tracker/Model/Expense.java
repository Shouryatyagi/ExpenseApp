package com.tracker.expense_tracker.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "expense")
@Data
@NoArgsConstructor
public class Expense {

    @Id @NonNull
    private ObjectId eid; // Primary Key

    private ObjectId userId; // Foreign Key (reference to User._id)

    private BigDecimal amount;

    private String description;

    private Category category;

    private PaymentMethod paymentMethod;

    private LocalDateTime date; // Expense Date

    private String location; // Optional

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum Category {
        FOOD,
        TRAVEL,
        BILLS,
        GROCERIES,
        OTHER
    }

    public enum PaymentMethod {
        CASH,
        CARD,
        UPI,
        NET_BANKING,
        OTHER
    }
}
