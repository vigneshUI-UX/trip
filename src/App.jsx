import React, { useState } from 'react';
import Card3D from './components/Card3D';
import SummaryPanel from './components/SummaryPanel';
import BookingModal from './components/BookingModal';
import './App.css';

// Import background images
import oceanBg from './assets/aerial-view-blue-ocean-wave-sand-beach.jpg';
import grassBg from './assets/1601.m10.i311.n029.S.c10.164511620 Seamless green grass vector pattern.jpg';

const TOUR_DATA = {
  kayaking: {
    id: 'kayaking',
    title: 'Kayaking',
    price: 3299,
    duration: '4hrs',
    location: 'Drina, Serbia',
    image: oceanBg,
  },
  camping: {
    id: 'camping',
    title: 'Camping',
    price: 2499,
    duration: '8hrs',
    location: 'Tara, Serbia',
    image: grassBg,
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('kayaking');
  const [bookings, setBookings] = useState({
    kayaking: null,
    camping: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTour = TOUR_DATA[activeTab];

  const handleConfirmBooking = (date) => {
    setBookings((prev) => ({
      ...prev,
      [activeTab]: date,
    }));
    setIsModalOpen(false);
  };

  const handleRemoveBooking = (tourId) => {
    setBookings((prev) => ({
      ...prev,
      [tourId]: null,
    }));
  };

  return (
    <div className="app-container">
      <div className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'kayaking' ? 'active' : ''}`}
          onClick={() => setActiveTab('kayaking')}
        >
          KAYAKING
        </button>
        <button
          className={`tab-btn ${activeTab === 'camping' ? 'active' : ''}`}
          onClick={() => setActiveTab('camping')}
        >
          CAMPING
        </button>
      </div>

      <div className="main-content">
        <Card3D
          tour={currentTour}
          bookedDate={bookings[activeTab]}
          onOpenModal={() => setIsModalOpen(true)}
          onCancelBooking={() => handleRemoveBooking(activeTab)}
        />
        <SummaryPanel bookings={bookings} onEdit={(tourId) => setActiveTab(tourId)} />
      </div>

      {isModalOpen && (
        <BookingModal
          tour={currentTour}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}