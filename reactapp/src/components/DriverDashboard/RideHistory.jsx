import React, { useState } from 'react';

function RideHistory({ driverData, isDarkMode, isPreview }) {
    const [filter, setFilter] = useState('all'); // all, completed, cancelled
    
    if (!driverData) return null;
    
    const { rideHistory } = driverData;
    
    // Filter rides based on selection
    const filteredRides = rideHistory.filter(ride => {
        if (filter === 'all') return true;
        return ride.status === filter;
    });
    
    if (isPreview) {
        // Show a simplified version for the dashboard preview
        return (
            <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
                <div className="card-header">
                    <h2 className="card-title">Recent Rides</h2>
                </div>
                <div className="card-body">
                    <div className="history-header">
                        <h3 className="driver-name">{driverData.name || 'Your Recent Rides'}</h3>
                    </div>
                    
                    <div className="ride-history-box preview">
                        <div className="ride-list">
                            {rideHistory.slice(0, 2).map((ride) => (
                                <div className="ride-item preview" key={ride.id}>
                                    <div className="ride-date-badge">
                                        {new Date(ride.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </div>
                                    <div className="ride-preview-content">
                                        <div className="preview-route">
                                            <div className="preview-location">{ride.pickup}</div>
                                            <div className="preview-arrow">→</div>
                                            <div className="preview-location">{ride.dropoff}</div>
                                        </div>
                                        <div className="preview-meta">
                                            <span className="preview-fare">₹{ride.fare}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="view-all-link">
                        <button className={`btn-sm ${isDarkMode ? 'btn-light' : 'btn-dark'}`}>
                            View All Rides
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">Ride History</h2>
            </div>
            <div className="card-body">
                <div className="history-header">
                    <h3 className="driver-name">{driverData.name || 'Your Ride History'}</h3>
                </div>
                
                <div className="history-filter-box">
                    <div className="filter-tabs">
                        <button 
                            className={`tab ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`tab ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                        <button 
                            className={`tab ${filter === 'cancelled' ? 'active' : ''}`}
                            onClick={() => setFilter('cancelled')}
                        >
                            Cancelled
                        </button>
                    </div>
                </div>
                
                <div className="ride-history-box">
                    {filteredRides.length === 0 ? (
                        <div className="no-rides">
                            <p>No rides found for the selected filter.</p>
                        </div>
                    ) : (
                        <div className="ride-list">
                            {filteredRides.map((ride) => (
                                <div className="ride-item" key={ride.id}>
                                    <div className="ride-date-badge">
                                        {new Date(ride.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </div>
                                    <div className="ride-route">
                                        <div className="route-point pickup">
                                            <div className="point-marker"></div>
                                            <div className="point-details">
                                                <span className="point-label">Pickup</span>
                                                <span className="point-value">{ride.pickup}</span>
                                            </div>
                                        </div>
                                        <div className="route-line"></div>
                                        <div className="route-point dropoff">
                                            <div className="point-marker"></div>
                                            <div className="point-details">
                                                <span className="point-label">Dropoff</span>
                                                <span className="point-value">{ride.dropoff}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ride-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Distance</span>
                                            <span className="meta-value">{ride.distance}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Duration</span>
                                            <span className="meta-value">{ride.duration}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Fare</span>
                                            <span className="meta-value fare-amount">₹{ride.fare}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Rating</span>
                                            <span className="meta-value rating">
                                                <span className="star-icon">★</span> {ride.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="history-actions">
                    <button className="btn btn-primary">
                        Download History
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RideHistory;
