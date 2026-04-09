import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, PackageOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    // Simulate network delay for a real feel
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back!');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="screen-center overflow-hidden">
      <motion.div 
        className="glass-panel"
        style={{ 
          maxWidth: '430px', 
          width: '100%', 
          borderRadius: '24px',
          padding: '2.5rem 2rem'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            style={{ 
              display: 'inline-flex', 
              background: 'var(--primary-color)',
              color: 'white',
              padding: '1rem',
              borderRadius: '50%',
              marginBottom: '1rem',
              boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)'
            }}
          >
            <PackageOpen size={32} />
          </motion.div>
          <h2>Tracking Portal</h2>
          <p className="text-muted text-sm" style={{ marginTop: '0.4rem' }}>
            Enter your credentials to manage active orders.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email address</label>
            <input 
              type="email" 
              className="form-control"
              placeholder="admin@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.85rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
              />
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
