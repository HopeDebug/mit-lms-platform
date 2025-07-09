import React from 'react';

const PaymentStatus = ({ paymentHistory = [], paymentStatus = '' }) => (
  <div>
    <h2 className="font-semibold mb-2">Payment Status</h2>
    <div className="mb-2">Current Status: <span className="font-bold">{paymentStatus}</span></div>
    <h3 className="font-semibold">History</h3>
    <ul>
      {paymentHistory.map((p, idx) => (
        <li key={idx} className="mb-1">
          <span>{p.date}:</span> <span className="font-bold">${p.amount}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PaymentStatus; 