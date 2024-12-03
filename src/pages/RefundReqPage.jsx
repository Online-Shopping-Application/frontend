import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { ArrowUpCircle, XCircle } from 'lucide-react';

const RefundPage = () => {
  const [refundRequests, setRefundRequests] = useState([
    { id: 1, clientName: "John Doe", itemName: "Wooden Chair", amount: 60.0 },
    { id: 2, clientName: "Jane Smith", itemName: "Dining Table", amount: 250.0 },
    { id: 3, clientName: "Alice Brown", itemName: "Sofa", amount: 500.0 },
    { id: 4, clientName: "Bob White", itemName: "Coffee Table", amount: 120.0 },
  ]);

  const [activePage, setActivePage] = useState('refunds');
  const [page, setPage] = useState(1);
  const ordersPerPage = 8;
  const startIndex = (page - 1) * ordersPerPage;
  const paginatedRefundRequests = refundRequests.slice(startIndex, startIndex + ordersPerPage);

  const buttonBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', width: '100vw', margin: 0, padding: 0 }}>
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div style={{ flex: '1', padding: '32px', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
              Refund Management
            </h2>
            <p style={{ color: '#6B7280' }}>Review and manage refund requests</p>
          </div>

          {/* Refund Requests Content */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', width: '100%' }}>
            {paginatedRefundRequests.map((refund) => (
              <div key={refund.id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{refund.clientName}</h3>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block' }}>Item</label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{refund.itemName}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block' }}>Amount</label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>${refund.amount.toFixed(2)}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
                  <button style={{ ...buttonBaseStyle, backgroundColor: '#4F46E5', color: 'white', flex: '1' }}>
                    <ArrowUpCircle style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Update
                  </button>
                  <button style={{ ...buttonBaseStyle, backgroundColor: '#EF4444', color: 'white', flex: '1' }}>
                    <XCircle style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;
