package com.tracker.expense_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ExpenseTrackerApplication {

	public static void main(String[] args) {
		// Load .env variables
		Dotenv dotenv = Dotenv.load();
		System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));

		SpringApplication.run(ExpenseTrackerApplication.class, args);
	}
}