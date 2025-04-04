import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ amount: '', category: '', date: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/expenses')
            .then(response => setExpenses(response.data))
            .catch(error => console.error('Error fetching expenses:', error));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addExpense = () => {
        axios.post('http://localhost:5000/expenses', form)
            .then(response => {
                setExpenses([...expenses, response.data.expense]);
                setForm({ amount: '', category: '', date: '' });
            })
            .catch(error => console.error('Error adding expense:', error));
    };

    const deleteExpense = (id) => {
      axios.delete(`http://localhost:5000/expenses/${id}`)
          .then(() => {
              setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== id)); // Ensure correct filtering
          })
          .catch(error => console.error('Error deleting expense:', error));
  };
  
  
    return (
        <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
            <h2>Expense Tracker</h2>
            <div>
                <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                <input type="date" name="date" value={form.date} onChange={handleChange} />
                <button onClick={addExpense}>Add Expense</button>
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
