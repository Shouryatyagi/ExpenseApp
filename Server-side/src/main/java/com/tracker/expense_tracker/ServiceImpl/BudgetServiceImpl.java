package com.tracker.expense_tracker.ServiceImpl;

import com.tracker.expense_tracker.Dao.BudgetDao;
import com.tracker.expense_tracker.Model.Budget;
import com.tracker.expense_tracker.Repo.BudgetRepo;
import com.tracker.expense_tracker.Service.BudgetService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepo budgetRepository;

    @Override
    public Budget saveOrUpdateBudget(BudgetDao dao) {
        ObjectId objectId = new ObjectId(dao.getUserId());

        Optional<Budget> existing = budgetRepository.findByUserIdAndMonthAndYear(
                objectId,
                dao.getMonth(),
                dao.getYear()
        );

        Budget budget;
        if (existing.isPresent()) {
            budget = existing.get();
            budget.setAmount(dao.getAmount());
            budget.setCategory(dao.getCategory());
            budget.setUpdatedAt(LocalDateTime.now());
        } else {
            budget = new Budget();
            budget.setUserId(objectId);
            budget.setAmount(dao.getAmount());
            budget.setCategory(dao.getCategory());
            budget.setMonth(dao.getMonth());
            budget.setYear(dao.getYear());
            budget.setCreatedAt(LocalDateTime.now());
        }

        return budgetRepository.save(budget);
    }

    @Override
    public Budget getBudget(BudgetDao dao) {
        ObjectId objectId = new ObjectId(dao.getUserId());
        return budgetRepository.findByUserIdAndMonthAndYear(objectId, dao.getMonth(), dao.getYear())
                .orElse(null);
    }
}
