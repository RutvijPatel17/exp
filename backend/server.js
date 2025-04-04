const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let expenses = []; // Temporary storage (resets on restart)

app.get('/expenses', (req, res) => {
    res.json(expenses);
});

app.post('/expenses', (req, res) => {
    const expense = req.body;
    expenses.push({ id: Date.now(), ...expense });
    res.json({ message: 'Expense added', expense });
});

app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id); // Ensure it's a number
    expenses = expenses.filter(exp => exp.id !== id);
    res.json({ message: 'Expense deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
