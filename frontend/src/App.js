import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
function App() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ amount: '', category: '', date: '' });

    // Fetch expenses on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/expenses')
            .then(response => setExpenses(response.data))
            .catch(error => console.error('Error fetching expenses:', error));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add expense
    const addExpense = () => {
        if (!form.amount || !form.category || !form.date) {
            alert("Please fill all fields");
            return;
        }

        axios.post('http://localhost:5000/expenses', form)
            .then(response => {
                setExpenses([...expenses, response.data.expense]);
                setForm({ amount: '', category: '', date: '' });
            })
            .catch(error => console.error('Error adding expense:', error));
    };

    // Delete a specific expense
    const deleteExpense = (id) => {
        console.log("🛑 Deleting ID:", id);

        axios.delete(`http://localhost:5000/expenses/${id}`)
            .then(() => {
                setExpenses(prevExpenses => {
                    console.log("Before Delete:", prevExpenses);
                    const updatedExpenses = prevExpenses.filter(exp => exp.id !== id);
                    console.log("After Delete:", updatedExpenses);
                    return updatedExpenses;
                });
            })
            .catch(error => console.error('Error deleting expense:', error));
    };

    return (
        <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
            <h2>Expense Tracker</h2>
            <div className="input-container">
    <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
    <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
    <input type="date" name="date" value={form.date} onChange={handleChange} />
    <button onClick={addExpense} className="add-btn">Add Expense</button>  {/* Moved Below Date Input */}
</div>

            <table border="1" width="100%" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(exp => (
                        <tr key={exp.id}>
                            <td>{exp.amount}</td>
                            <td>{exp.category}</td>
                            <td>{exp.date}</td>
                            <td><button onClick={() => deleteExpense(exp.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
