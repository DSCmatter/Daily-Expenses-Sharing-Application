// routes/expenseRoutes.js

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

// MongoDB connection setup
const uri = process.env.MONGO_URI; // Your MongoDB URI
const client = new MongoClient(uri);

// Add an expense
router.post('/add', async (req, res) => {
    const { userId, amount, participants, method, splits } = req.body;

    // Basic validation
    if (!userId || !amount || !participants || !method) {
        return res.status(400).json({ message: 'Required fields are missing.' });
    }

    try {
        await client.connect();
        const database = client.db('expenseSharing'); // Your database name
        const expensesCollection = database.collection('expenses');

        const newExpense = { userId, amount, participants, method, splits };
        const result = await expensesCollection.insertOne(newExpense);

        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
});

// Retrieve individual user expenses
router.get('/:userId', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('expenseSharing');
        const expensesCollection = database.collection('expenses');

        // Fetch expenses for the specified user
        const expenses = await expensesCollection.find({ userId: req.params.userId }).toArray();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
});

// Retrieve a specific expense by ID
router.get('/expense/:expenseId', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('expenseSharing');
        const expensesCollection = database.collection('expenses');

        // Use ObjectId to query the specific expense
        const expense = await expensesCollection.findOne({ _id: ObjectId(req.params.expenseId) });
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
});

module.exports = router;
