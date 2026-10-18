import React from 'react';
import './SummaryPanel.css';

export default function SummaryPanel({ bookings, onEdit }) {
  const calculateTotal = () => {
    let total = 0;
    if (bookings.kayaking) total += 3299;
    if (bookings.camping) total += 2499;
    return total;
  };

  return (
    <div className="summary-panel">
      <div className="summary-header">
        <span className="summary-icon">📋</span>
        <h3>Booking Details</h3>
      </div>

      <div className="booking-items-list">
        {/* Kayaking Item */}
        <div className="summary-item">
          <div className="item-info">
            <span className="item-title">🛶 Kayaking</span>
            <span className={`item-date ${bookings.kayaking ? 'booked' : ''}`}>
              {bookings.kayaking ? bookings.kayaking : 'Not booked'}
            </span>
          </div>
          <div className="item-price-action">
            <span className="item-price">₹3,299</span>
            {bookings.kayaking ? (
              <button className="action-link" onClick={() => onEdit('kayaking')}>
                edit
              </button>
            ) : (
              <button className="action-link" onClick={() => onEdit('kayaking')}>
                choose date
              </button>
            )}
          </div>
        </div>

        {/* Camping Item */}
        <div className="summary-item">
          <div className="item-info">
            <span className="item-title">⛺ Camping</span>
            <span className={`item-date ${bookings.camping ? 'booked' : ''}`}>
              {bookings.camping ? bookings.camping : 'Not booked'}
            </span>
          </div>
          <div className="item-price-action">
            <span className="item-price">₹2,499</span>
            {bookings.camping ? (
              <button className="action-link" onClick={() => onEdit('camping')}>
                edit
              </button>
            ) : (
              <button className="action-link" onClick={() => onEdit('camping')}>
                choose date
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="summary-footer">
        <span>Total Payable</span>
        <span className="total-price">₹{calculateTotal().toLocaleString()}</span>
      </div>
    </div>
  );
}