export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  createdAt: '2024-01-01T00:00:00Z'
};

export const mockExpenses = [
  {
    id: '1',
    amount: 85.50,
    description: 'Weekly groceries',
    category: 'Food',
    date: '2024-01-15',
    userId: '1',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    amount: 1200.00,
    description: 'Monthly rent',
    category: 'Housing',
    date: '2024-01-01',
    userId: '1',
    createdAt: '2024-01-01T09:00:00Z'
  },
  {
    id: '3',
    amount: 45.00,
    description: 'Gas station',
    category: 'Transportation',
    date: '2024-01-14',
    userId: '1',
    createdAt: '2024-01-14T16:45:00Z'
  },
  {
    id: '4',
    amount: 25.99,
    description: 'Netflix subscription',
    category: 'Entertainment',
    date: '2024-01-10',
    userId: '1',
    createdAt: '2024-01-10T12:00:00Z'
  },
  {
    id: '5',
    amount: 150.00,
    description: 'Utility bills',
    category: 'Housing',
    date: '2024-01-12',
    userId: '1',
    createdAt: '2024-01-12T14:20:00Z'
  }
];

export const mockBudgets = [
  {
    id: '1',
    category: 'Food',
    amount: 500.00,
    spent: 285.50,
    period: 'monthly',
    userId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    category: 'Housing',
    amount: 1500.00,
    spent: 1350.00,
    period: 'monthly',
    userId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    category: 'Transportation',
    amount: 200.00,
    spent: 145.00,
    period: 'monthly',
    userId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    category: 'Entertainment',
    amount: 100.00,
    spent: 75.99,
    period: 'monthly',
    userId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const expenseCategories = [
  'Food',
  'Housing',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Travel',
  'Other'
];

export const categoryColors = {
  Food: '#10B981',
  Housing: '#3B82F6',
  Transportation: '#F59E0B',
  Entertainment: '#EF4444',
  Healthcare: '#8B5CF6',
  Shopping: '#EC4899',
  Education: '#06B6D4',
  Travel: '#84CC16',
  Other: '#6B7280'
};