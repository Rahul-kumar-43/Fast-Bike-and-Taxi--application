import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TopBar({ driverData, toggleOnlineStatus, toggleSidebar, isDarkMode }) {
    const navigate = useNavigate();
    const [showReviews, setShowReviews] = useState(false);

    if (!driverData) return null;

    // Sample user comments - in a real app, these would come from the driverData
    const userFeedback = [
        {
            name: 'Priya S.',
            rating: 5,
            comment: 'Very professional and courteous driver. Smooth ride!'
        },
        {
            name: 'Rahul M.',
            rating: 4,
            comment: 'Good ride, but took a longer route than necessary.'
        },
        {
            name: 'Anjali K.',
            rating: 5,
            comment: 'Great service! Driver was punctual and helpful.'
        }
    ];

    const handleLogout = () => {
        // Clear login status
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        
        // Redirect to home page
        navigate('/');
    };

    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };

    return (
        <div className={`dashboard-header ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="header-left">
                <button 
                    className="sidebar-toggle" 
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    ☰
                </button>
                <span className="header-title">Driver Dashboard</span>
            </div>
            
            <div className="header-center">
                <div className="performance-summary" onClick={toggleReviews}>
                    <div className="rating-badge">
                        <span className="star-icon">★</span>
                        <span className="rating-value">{driverData.rating}</span>
                    </div>
                    <div className="trips-count">
                        <span>{driverData.totalTrips} trips</span>
                    </div>
                    
                    {showReviews && (
                        <div className="recent-reviews-dropdown">
                            <h4>Recent Reviews</h4>
                            <div className="reviews-list">
                                {userFeedback.map((feedback, index) => (
                                    <div className="review-item" key={index}>
                                        <div className="review-header">
                                            <span className="reviewer-name">{feedback.name}</span>
                                            <div className="review-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <span 
                                                        key={i} 
                                                        className={`star ${i < feedback.rating ? 'filled' : ''}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="review-comment">
                                            "{feedback.comment}"
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="profile-section">
                <div className="online-status">
                    <span className="status-text">
                        {driverData.isOnline ? 'Online' : 'Offline'}
                    </span>
                    <label className="status-toggle">
                        <input 
                            type="checkbox" 
                            checked={driverData.isOnline} 
                            onChange={toggleOnlineStatus} 
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                
                <div className="driver-info">
                    <h3>{driverData.name}</h3>
                    <div className="driver-level">{driverData.driverLevel} Driver</div>
                </div>
                
                <img 
                    src={driverData.profilePhoto || 'https://via.placeholder.com/50'} 
                    alt="Driver" 
                    className="profile-image" 
                />
                
                <div className="logout-button">
                    <button 
                        onClick={handleLogout}
                        className={`btn-logout ${isDarkMode ? 'dark' : ''}`}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
