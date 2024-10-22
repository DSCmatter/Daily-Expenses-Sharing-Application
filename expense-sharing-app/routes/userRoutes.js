// routes/userRoutes.js

const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// MongoDB connection setup
const uri = process.env.MONGO_URI; // Your MongoDB URI
const client = new MongoClient(uri);

// Create a new user
router.post('/create', async (req, res) => {
    const { email, name, mobile } = req.body;

    // Basic validation
    if (!email || !name || !mobile) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await client.connect();
        const database = client.db('expenseSharing'); // Your database name
        const usersCollection = database.collection('users');

        const newUser = { email, name, mobile };
        const result = await usersCollection.insertOne(newUser);
        
        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
});

// Retrieve user details
router.get('/:userId', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('expenseSharing');
        const usersCollection = database.collection('users');

        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
});

module.exports = router;
