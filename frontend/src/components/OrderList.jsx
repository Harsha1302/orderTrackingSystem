import React from 'react';
import OrderItem from './OrderItem';
import { Inbox } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const OrderList = ({ orders, onOrderUpdate, onOrderDelete }) => {
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <Inbox size={48} style={{ opacity: 0.3, marginBottom: '1rem', display: 'inline-block' }} strokeWidth={1} />
        <h3>No active orders</h3>
        <p>Orders you create will appear here.</p>
      </div>
    );
  }

  return (
    <div className="order-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AnimatePresence>
        {orders.map((order, index) => (
          <OrderItem 
            key={order.id} 
            order={order} 
            onOrderUpdate={onOrderUpdate} 
            onOrderDelete={onOrderDelete}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrderList;
