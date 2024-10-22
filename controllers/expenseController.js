const Expense = require('../models/Expense');
const { validatePercentages } = require('../utils/validation');

// Add an expense
exports.addExpense = async (req, res) => {
  try {
    const { description, totalAmount, splitMethod, participants, createdBy } = req.body;

    // Validate percentage splits
    if (splitMethod === 'percentage' && !validatePercentages(participants)) {
      return res.status(400).json({ error: 'Percentages must add up to 100%' });
    }

    const expense = new Expense({
      description,
      totalAmount,
      splitMethod,
      participants,
      createdBy,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve individual user expenses
exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.userId': req.params.userId });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve overall expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('createdBy');
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
