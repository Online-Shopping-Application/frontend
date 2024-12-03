import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { ArrowUpCircle, XCircle } from 'lucide-react';

const OrderPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, clientName: "John Doe", itemName: "Wooden Chair", quantity: 2, amount: 60.0, status: "Pending", trackingNumber: "", canceled: false, cancelMessage: "", accepted: false },
    { id: 2, clientName: "Jane Smith", itemName: "Dining Table", quantity: 1, amount: 250.0, status: "Pending", trackingNumber: "", canceled: false, cancelMessage: "", accepted: false },
    { id: 11, clientName: "Alice Brown", itemName: "Sofa", quantity: 1, amount: 500.0, status: "Pending", trackingNumber: "", canceled: false, cancelMessage: "", accepted: false },
    { id: 4, clientName: "Bob White", itemName: "Coffee Table", quantity: 3, amount: 120.0, status: "Pending", trackingNumber: "", canceled: false, cancelMessage: "", accepted: false },
  ]);

  const [activePage, setActivePage] = useState('orders');
  const [orderStatus, setOrderStatus] = useState('');
  const [messageSending, setMessageSending] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [editingTracking, setEditingTracking] = useState(null);
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [selectedOrderToReject, setSelectedOrderToReject] = useState(null);

  const handleRejectOrder = (orderId) => {
    setSelectedOrderToReject(orderId);
    setShowConfirmReject(true);
  };

  const confirmRejectOrder = (confirmed) => {
    if (confirmed) {
      setOrders(orders.map(order =>
        order.id === selectedOrderToReject ? { ...order, canceled: true, rejected: true } : order
      ));
      alert('Order has been rejected.');
    }
    setShowConfirmReject(false);
    setSelectedOrderToReject(null);
  };

  const handleRejectButtonClick = (orderId) => {
    const confirmMessage = `Are you sure you want to reject the order with ID ${orderId}?`;
    const isConfirmed = window.confirm(confirmMessage);
    if (isConfirmed) {
      handleRejectOrder(orderId); // Reject the order
    }
  };

  const handleStatusChangeCancle = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, canceled: true } : order
    ));
  };

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, accepted: true, status: 'Accepted' } : order
    ));
  };

  const handleEditTracking = (orderId) => {
    setEditingTracking(orderId);
    alert(`Tracking Number for Order ID: ${orderId} saved.`);
  };

  const handleSaveTracking = (orderId) => {
    alert(`Tracking Number for Order ID: ${orderId} Updated.`);
    setEditingTracking(null);
  };

  const handleSendMessage = (orderId) => {
    setMessageSending(true);
    setTimeout(() => {
      alert(`Cancellation message sent for Order ID: ${orderId}`);
      setMessageSending(false);
      setMessageText('');
    }, 1000);
  };

  const handleStatusChange = (orderId, status) => {
    setOrderStatus(status);
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
    setSelectedOrderId(null);  // Close dropdown after status change
  };

  const handleTrackingChange = (orderId, trackingNumber) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, trackingNumber } : order
    ));
  };

  const handleReactivateOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, canceled: false, status: 'Pending', cancelMessage: '', accepted: false } : order
    ));
  };

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
    transition: 'background-color 0.2s',
    width: '100%',
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
              Orders Management
            </h2>
            <p style={{ color: '#6B7280' }}>Review and manage orders</p>
          </div>

          {/* Order Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            width: '100%'
          }}>
            {orders.map((order) => (
              <div key={order.id} style={{
                backgroundColor: order.canceled ? '#f3f4f6' : 'white',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}>
                {/* Order Details */}
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{order.clientName}</h3>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block' }}>Item</label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{order.itemName}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block' }}>Amount</label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>${order.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6B7280', display: 'block' }}>Status</label>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{order.status}</p>
                  </div>

                 
                 
                 
                 {/* Dropdown for status inside the card */}
                {order.accepted && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    zIndex: 10,
                    width: 'auto',
                  }}>
                    <label style={{ fontSize: '12px', color: '#6B7280' }}>Update Order Status</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        width: '160px',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>
                )}
                 
                 
                
                </div>

                {/* Accept and Cancel Order buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    style={{
                      ...buttonBaseStyle,
                      backgroundColor: order.canceled || order.accepted ? '#d1d5db' : '#10B981',
                      cursor: order.canceled || order.accepted ? 'not-allowed' : 'pointer',
                      color: order.canceled || order.accepted ? '#9ca3af' : 'white',
                    }}
                    disabled={order.accepted}
                  >
                    <ArrowUpCircle size={18} />
                    Accept
                  </button>

                  <button
                    onClick={() => handleRejectButtonClick(order.id)}
                    style={{
                      ...buttonBaseStyle,
                      backgroundColor:'#EF4444',
                      cursor:'pointer',
                      color:'white',
                    }}
                    disabled={order.rejected || setShowConfirmReject==true}
                  >
                    <XCircle size={18} />
                    Reject
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

export default OrderPage;
