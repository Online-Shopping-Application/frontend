import React from 'react';
import { Link } from 'react-router-dom';  // For navigation
import { Package, RefreshCw } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div style={{ 
      width: '256px', 
      backgroundColor: '#312E81', 
      color: 'white',
      flexShrink: 0 
    }}>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>Seller Dashboard</h1>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>



        <Link
            to="/orderpage"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              backgroundColor: activePage === 'refund' ? '#4338CA' : 'transparent',
              color: activePage === 'refund' ? 'white' : '#D1D5DB',
              transition: 'background-color 0.2s',
              textDecoration: 'none',
            }}
            onClick={() => setActivePage('refund')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4338CA'}
            onMouseLeave={(e) => e.target.style.backgroundColor = activePage === 'refund' ? '#4338CA' : 'transparent'}
          >
            <Package style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            <span>Orders</span>
          </Link>


          <Link
            to="/refundpage"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              backgroundColor: activePage === 'order-status' ? '#4338CA' : 'transparent',
              color: activePage === 'order-status' ? 'white' : '#D1D5DB',
              transition: 'background-color 0.2s',
              textDecoration: 'none',
            }}
            onClick={() => setActivePage('order-status')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4338CA'}
            onMouseLeave={(e) => e.target.style.backgroundColor = activePage === 'order-status' ? '#4338CA' : 'transparent'}
          >
            <RefreshCw style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            <span>Refund Request</span>
          </Link>
          
          
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
