import React, { useRef } from 'react';
import './Card3D.css';
import kayakingTopImg from '../assets/kayaking.jpg'; // Kayak graphic[cite: 6]
import splashImg from '../assets/splash.png';         // Water splash graphic[cite: 7]
import campingTopImg from '../assets/camping.png';     // Tent graphic[cite: 5]
import tentTreeImg from '../assets/tent-tree.png';     // Tree shrub graphic[cite: 8]
import rockImg from '../assets/rock.png';

export default function Card3D({ tour, bookedDate, onOpenModal, onCancelBooking }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="card-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="card" ref={cardRef}>
        
        {/* Header container with background image and dual top-layer PNG overlays */}
        <div 
          className="card-image-container"
          style={{ backgroundImage: `url(${tour.image})` }}
        >
          {tour.id === 'kayaking' ? (
            <>
              <img src={kayakingTopImg} alt="Kayak Overlay" className="top-layer-asset kayaking-top" />
              <img src={splashImg} alt="Water Splash Overlay" className="secondary-overlay kayaking-splash" />
            </>
          ) : (
            <>
              <img src={campingTopImg} alt="Tent Overlay" className="top-layer-asset camping-top" />
              <img src={tentTreeImg} alt="Tree Shrub Overlay" className="secondary-overlay camping-tree" />
            </>
          )}
        </div>

        <div className="card-body">
          <h2 className="tour-title">{tour.title}</h2>
          
          <div className="tour-price-row">
            <span className="price">₹{tour.price.toLocaleString()}</span>
            <span className="price-divider">/</span>
            <span className="duration">{tour.duration}</span>
          </div>
          <p className="per-person">per person</p>

          <div className="tour-location">
            <span className="location-icon">📍</span>
            <span>{tour.location}</span>
          </div>

          <div className="card-action-container">
            {bookedDate ? (
              <div className="booked-status-container">
                <div className="booked-badge">
                  <span>✔ Booked: {bookedDate}</span>
                </div>
                <button className="btn manage-btn" onClick={onOpenModal}>
                  Manage Booking
                </button>
              </div>
            ) : (
              <button className="btn choose-btn" onClick={onOpenModal}>
                Choose Date
              </button>
            )}

            <img src={rockImg} alt="Rock decoration" className="bottom-rock" />
          </div>
        </div>
      </div>
    </div>
  );
}