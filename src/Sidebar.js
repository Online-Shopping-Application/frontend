import React from 'react';

const Sidebar = ({ onNavigate }) => {
  const menuItems = [
    { text: 'Dashboard', key: 'dashboard' },
    { text: 'Add Product', key: 'addProduct' },
    { text: 'Order List', key: 'orderList' },
    { text: 'Refund Request', key: 'Refund Request' },
  ];

  const handleNavigation = (key) => {
    if (onNavigate) {
      onNavigate(key);
    }
  };

  return (
    <div
      style={{
        width: '200px',
        borderRight: '1px solid #ccc',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        height: '100vh', // Full viewport height
        position: 'fixed', // Fixes the sidebar
        top: 0, // Ensures it's aligned to the top
        left: 0, // Aligns it to the left
        overflowY: 'auto', // Allows scrolling if content exceeds viewport height
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Seller Panel</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => handleNavigation(item.key)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: '1px solid #ddd',
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
