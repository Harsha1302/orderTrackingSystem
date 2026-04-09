const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Helper function to generate order IDs like ORD-1234
const generateOrderId = () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

// Mapping of stages for validation
const STAGES = ['Placed', 'Packed', 'Shipped', 'Delivered'];

// POST /api/orders -> Create order
app.post('/api/orders', (req, res) => {
    const { customer_name, product_name } = req.body;
    
    if (!customer_name || !product_name) {
        return res.status(400).json({ error: 'customer_name and product_name are required' });
    }

    const order_id = generateOrderId();
    const status = 'Placed';

    const sql = 'INSERT INTO orders (order_id, customer_name, product_name, status) VALUES (?, ?, ?, ?)';
    db.run(sql, [order_id, customer_name, product_name, status], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            order_id,
            customer_name,
            product_name,
            status
        });
    });
});

// GET /api/orders -> Get all orders
app.get('/api/orders', (req, res) => {
    const sql = 'SELECT * FROM orders ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET /api/orders/:id -> Get single order
app.get('/api/orders/:id', (req, res) => {
    const sql = 'SELECT * FROM orders WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(row);
    });
});

// PUT /api/orders/:id/status -> Update order status
app.put('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    
    // First, find the current order to check its current status
    db.get('SELECT status FROM orders WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const currentStatus = row.status;
        const currentIndex = STAGES.indexOf(currentStatus);
        
        if (currentIndex === -1) {
            return res.status(500).json({ error: 'Invalid current status in DB' });
        }
        
        if (currentIndex === STAGES.length - 1) {
            return res.status(400).json({ error: 'Order is already Delivered' });
        }

        const nextStatus = STAGES[currentIndex + 1];

        // Update to the next status
        db.run('UPDATE orders SET status = ? WHERE id = ?', [nextStatus, id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Status updated successfully', currentStatus: nextStatus });
        });
    });
});

// DELETE /orders/:id -> Delete order
app.delete('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM orders WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
