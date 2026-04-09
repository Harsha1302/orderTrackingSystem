import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageSearch, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import CreateOrder from '../components/CreateOrder';
import OrderList from '../components/OrderList';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async (silent = false) => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
      if (!silent) setLoading(false);
    } catch (err) {
      if (!silent) toast.error('Failed to connect to the server');
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll for new updates every 5 seconds
    const interval = setInterval(() => {
      fetchOrders(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOrderCreated = (newOrder) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const handleOrderUpdate = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleOrderDelete = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const handleLogout = () => {
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <motion.div 
      className="dashboard-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--primary-color)',
            color: 'white',
            padding: '0.65rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)'
          }}>
            <PackageSearch size={28} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', marginBottom: '0.1rem' }}>Order System</h1>
            <p className="text-sm text-muted" style={{ margin: 0 }}>Real-time overview & tracking</p>
          </div>
        </div>
        
        <button className="btn btn-secondary" onClick={handleLogout}>
          <LogOut size={18} />
          Sign Out
        </button>
      </header>

      <div className="dashboard-grid">
        <aside>
          <CreateOrder onOrderCreated={handleOrderCreated} />
        </aside>
        
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>Active Tracking</h2>
            <div className="text-xs text-muted" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }} className="pulse-glow"></span>
              Live Updates
            </div>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              Loading orders...
            </div>
          ) : (
            <OrderList 
              orders={orders} 
              onOrderUpdate={handleOrderUpdate} 
              onOrderDelete={handleOrderDelete}
            />
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;
