import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, CheckCircle2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProgressTracker from './ProgressTracker';

const STAGES = ['Placed', 'Packed', 'Shipped', 'Delivered'];

const OrderItem = ({ order, onOrderUpdate, onOrderDelete, index }) => {
  const [updating, setUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateStatus = async () => {
    setUpdating(true);
    try {
      const response = await axios.put(`/api/orders/${order.id}/status`);
      onOrderUpdate(order.id, response.data.currentStatus);
      toast.success(`Order advanced to ${response.data.currentStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/orders/${order.id}`);
      toast.success('Order deleted successfully');
      if (onOrderDelete) onOrderDelete(order.id);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete order');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const isDelivered = order.status === 'Delivered';
  
  // Format dates: 'created_at' if available, otherwise just mock a time or show un-available.
  const orderDate = order.created_at ? new Date(order.created_at).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  }) : 'Just now';

  return (
    <motion.div 
      className={`order-card ${isDelivered ? 'is-delivered' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, padding: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
    >
      <div className="order-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{order.product_name}</h3>
            <span className={`badge badge-${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} /> {order.customer_name}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {orderDate}
            </span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              #{order.order_id}
            </span>
          </div>
        </div>
        
        {isDelivered && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: 'spring' }}
            style={{ color: 'var(--success-color)' }}
          >
            <CheckCircle2 size={32} />
          </motion.div>
        )}
      </div>

      <ProgressTracker currentStatus={order.status} />

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Delete functionality */}
        <div>
          {showDeleteConfirm ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-sm text-muted">Are you sure?</span>
              <button className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? '...' : 'Yes, Delete'}
              </button>
              <button className="btn btn-ghost" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Cancel
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-ghost" 
              onClick={() => setShowDeleteConfirm(true)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', gap: '0.25rem' }}
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>

        {!isDelivered && (
          <button 
            className="btn btn-outline" 
            onClick={handleUpdateStatus} 
            disabled={updating || isDeleting}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
          >
            {updating ? 'Updating...' : (
              <>
                Advance Status <ArrowRight size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default OrderItem;
