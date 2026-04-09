import React, { useState } from 'react';
import axios from 'axios';
import { PackagePlus, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CreateOrder = ({ onOrderCreated }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !productName) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/orders', {
        customer_name: customerName,
        product_name: productName
      });
      
      toast.success('Order placed successfully!');
      setCustomerName('');
      setProductName('');
      
      if (onOrderCreated) {
        onOrderCreated(response.data);
      }
      
      // Close the form temporarily to satisfy UI prompt
      setIsOpen(false);
      
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create order';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: isOpen ? '1.5rem' : '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create Order</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ 
            background: 'var(--background-color)', 
            padding: '0.5rem', 
            borderRadius: '50%',
            color: 'var(--text-secondary)'
          }}
        >
          {isOpen ? <X size={18} /> : <Plus size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '1.5rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  disabled={loading}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Wireless Mouse"
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Processing...' : (
                  <>
                    <PackagePlus size={18} />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          style={{ marginTop: '1rem' }}
        >
          <button 
            type="button" 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            onClick={() => setIsOpen(true)}
          >
            <Plus size={18} />
            Start New Order
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CreateOrder;
