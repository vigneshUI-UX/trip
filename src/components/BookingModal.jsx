import React, { useState } from 'react';
import './BookingModal.css';

export default function BookingModal({ tour, onClose, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState('2026-09-28');

  const handleQuickSelect = (daysOffset) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysOffset);
    setSelectedDate(targetDate.toISOString().split('T')[0]);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-badge">
          <span>🏷️ {tour.title.toUpperCase()}</span>
        </div>

        <h3 className="modal-title">Select Booking Date</h3>
        <p className="modal-subtitle">{tour.location} - ₹{tour.price.toLocaleString()} per person</p>

        <div className="date-picker-section">
          <label>CHOOSE DATE</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="quick-options">
          <button onClick={() => handleQuickSelect(1)}>Tomorrow</button>
          <button onClick={() => handleQuickSelect(3)}>This Saturday</button>
          <button onClick={() => handleQuickSelect(7)}>In 1 Week</button>
        </div>

        <button className="confirm-btn" onClick={() => onConfirm(selectedDate)}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}