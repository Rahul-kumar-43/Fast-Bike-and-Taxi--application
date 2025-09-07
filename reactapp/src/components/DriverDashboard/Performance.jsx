import React from 'react';

function Performance({ driverData, isDarkMode }) {
    if (!driverData) return null;
    
    const { rating, totalTrips, driverLevel } = driverData;
    
    // Sample performance metrics
    const performanceMetrics = [
        {
            name: 'Acceptance Rate',
            value: '92%',
            description: 'Percentage of ride requests you accept'
        },
        {
            name: 'Completion Rate',
            value: '96%',
            description: 'Percentage of accepted rides you complete'
        },
        {
            name: 'On-Time Rate',
            value: '89%',
            description: 'Percentage of rides completed within estimated time'
        }
    ];
    
    // Sample user comments
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
    
    return (
        <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">Performance & Ratings</h2>
            </div>
            <div className="card-body">
                <div className="rating-header">
                    <h3 className="driver-name">{driverData.name || 'Your Performance'}</h3>
                </div>
                
                <div className="performance-box">
                    <div className="rating-overview">
                        <div className="rating-display">
                            <span className="star-icon">★</span>
                            <span className="rating-value">{rating}</span>
                            <span className="rating-count">({totalTrips} trips)</span>
                        </div>
                        <div className="driver-level-badge">
                            {driverLevel} Driver
                        </div>
                    </div>
                    
                    <div className="performance-metrics-grid">
                        {performanceMetrics.map((metric, index) => (
                            <div className="metric-box" key={index}>
                                <div className="metric-value">{metric.value}</div>
                                <div className="metric-name">{metric.name}</div>
                                <div className="metric-description">{metric.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="feedback-section">
                    <h3 className="section-title">Recent Feedback</h3>
                    
                    <div className="feedback-cards">
                        {userFeedback.map((feedback, index) => (
                            <div className="feedback-box" key={index}>
                                <div className="feedback-header">
                                    <span className="passenger-name">{feedback.name}</span>
                                    <div className="feedback-rating">
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
                                <div className="feedback-comment">
                                    "{feedback.comment}"
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="tips-box">
                    <h3 className="section-title">Tips to Improve</h3>
                    <ul className="tips-list">
                        <li>Maintain a clean and well-maintained vehicle</li>
                        <li>Always follow the suggested route on the app</li>
                        <li>Be polite and professional with passengers</li>
                        <li>Avoid cancellations after accepting rides</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Performance;
