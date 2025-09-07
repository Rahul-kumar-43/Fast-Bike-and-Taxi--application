import React, { useState } from 'react';

function RideControl({ driverData, isDarkMode }) {
    const [activeRide, setActiveRide] = useState(null);
    const [pendingRequest, setPendingRequest] = useState({
        id: 'REQ12345',
        passengerName: 'Vikram Mehta',
        pickup: 'Koramangala 5th Block',
        dropoff: 'Indiranagar 12th Main',
        estimatedFare: 180,
        estimatedDistance: '7.5 km',
        estimatedDuration: '22 min'
    });

    const acceptRide = () => {
        setActiveRide({
            ...pendingRequest,
            status: 'accepted',
            startTime: new Date().toISOString()
        });
        setPendingRequest(null);
    };

    const declineRide = () => {
        // In a real app, you would send this to your API
        setPendingRequest(null);
        // Maybe fetch new requests
    };

    const completeRide = () => {
        // In a real app, you would send this to your API
        setActiveRide(null);
    };

    const cancelRide = () => {
        // In a real app, you would send this to your API
        setActiveRide(null);
    };

    if (!driverData || !driverData.isOnline) {
        return (
            <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
                <div className="card-header">
                    <h2 className="card-title">Ride Control</h2>
                </div>
                <div className="card-body">
                    <div className="offline-message">
                        <p>You are currently offline. Go online to receive ride requests.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">Ride Control</h2>
                {activeRide && <span className="status-badge">Active Ride</span>}
            </div>
            
            <div className="card-body">
                {activeRide ? (
                    <div className="active-ride">
                        <div className="ride-header">
                            <h3 className="passenger-name">{activeRide.passengerName}</h3>
                        </div>
                        
                        <div className="ride-box">
                            <div className="ride-route">
                                <div className="route-point pickup">
                                    <div className="point-marker"></div>
                                    <div className="point-details">
                                        <span className="point-label">Pickup</span>
                                        <span className="point-value">{activeRide.pickup}</span>
                                    </div>
                                </div>
                                <div className="route-line"></div>
                                <div className="route-point dropoff">
                                    <div className="point-marker"></div>
                                    <div className="point-details">
                                        <span className="point-label">Dropoff</span>
                                        <span className="point-value">{activeRide.dropoff}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="ride-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Estimated Fare</span>
                                    <span className="meta-value">₹{activeRide.estimatedFare}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="ride-actions">
                            <button className="btn btn-primary" onClick={completeRide}>
                                Complete Ride
                            </button>
                            <button className="btn btn-danger" onClick={cancelRide}>
                                Cancel Ride
                            </button>
                        </div>
                    </div>
                ) : pendingRequest ? (
                    <div className="ride-request">
                        <div className="ride-header">
                            <h3 className="passenger-name">{pendingRequest.passengerName}</h3>
                        </div>
                        
                        <div className="ride-box">
                            <div className="ride-route">
                                <div className="route-point pickup">
                                    <div className="point-marker"></div>
                                    <div className="point-details">
                                        <span className="point-label">Pickup</span>
                                        <span className="point-value">{pendingRequest.pickup}</span>
                                    </div>
                                </div>
                                <div className="route-line"></div>
                                <div className="route-point dropoff">
                                    <div className="point-marker"></div>
                                    <div className="point-details">
                                        <span className="point-label">Dropoff</span>
                                        <span className="point-value">{pendingRequest.dropoff}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="ride-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Estimated Fare</span>
                                    <span className="meta-value">₹{pendingRequest.estimatedFare}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Distance</span>
                                    <span className="meta-value">{pendingRequest.estimatedDistance}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Duration</span>
                                    <span className="meta-value">{pendingRequest.estimatedDuration}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="request-timer">
                            <span>Time to respond: 15s</span>
                            <div className="timer-bar"></div>
                        </div>
                        
                        <div className="ride-actions">
                            <button className="btn btn-primary" onClick={acceptRide}>
                                Accept
                            </button>
                            <button className="btn btn-danger" onClick={declineRide}>
                                Decline
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="waiting-for-requests">
                        <div className="waiting-animation">
                            <div className="pulse-circle"></div>
                        </div>
                        <p>Waiting for ride requests...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RideControl;
