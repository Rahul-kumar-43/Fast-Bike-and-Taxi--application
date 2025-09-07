import React, { useState } from 'react';

function Earnings({ driverData, isDarkMode, isPreview }) {
    const [timeFrame, setTimeFrame] = useState('weekly'); // daily, weekly, monthly
    
    if (!driverData) return null;
    
    const { wallet, earnings } = driverData;
    
    // Sample earnings data
    const earningsData = {
        daily: [
            { date: 'Today', amount: earnings.today, rides: 8 },
            { date: 'Yesterday', amount: 720, rides: 7 },
            { date: '2 days ago', amount: 840, rides: 9 },
            { date: '3 days ago', amount: 690, rides: 6 },
            { date: '4 days ago', amount: 780, rides: 8 },
        ],
        weekly: [
            { date: 'This Week', amount: earnings.weekly, rides: 32 },
            { date: 'Last Week', amount: 3960, rides: 29 },
            { date: '2 weeks ago', amount: 4120, rides: 31 },
            { date: '3 weeks ago', amount: 3840, rides: 28 },
        ],
        monthly: [
            { date: 'This Month', amount: earnings.monthly, rides: 120 },
            { date: 'Last Month', amount: 14800, rides: 115 },
            { date: '2 months ago', amount: 15200, rides: 118 },
        ]
    };
    
    const currentEarnings = earningsData[timeFrame];
    
    if (isPreview) {
        return (
            <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
                <div className="card-header">
                    <h2 className="card-title">Earnings Overview</h2>
                    <div className="card-actions">
                        <button className={`btn-sm ${isDarkMode ? 'btn-light' : 'btn-dark'}`} onClick={() => setTimeFrame('daily')}>Daily</button>
                        <button className={`btn-sm ${isDarkMode ? 'btn-light' : 'btn-dark'}`} onClick={() => setTimeFrame('weekly')}>Weekly</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="earnings-header">
                        <h3 className="driver-name">{driverData.name || 'Your Earnings'}</h3>
                    </div>
                    
                    <div className="wallet-box preview">
                        <div className="wallet-info">
                            <h3>Available Balance</h3>
                            <div className="wallet-balance">₹{wallet.balance}</div>
                        </div>
                    </div>
                    
                    <div className="earnings-summary-box preview">
                        <div className="summary-grid">
                            <div className="summary-card">
                                <h4>{timeFrame === 'daily' ? 'Today' : 'This Week'}</h4>
                                <div className="summary-value">
                                    ₹{timeFrame === 'daily' ? earnings.today : earnings.weekly}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">Earnings & Wallet</h2>
            </div>
            <div className="card-body">
                <div className="earnings-header">
                    <h3 className="driver-name">{driverData.name || 'Your Earnings'}</h3>
                </div>
                
                <div className="wallet-box">
                    <div className="wallet-info">
                        <h3>Wallet Balance</h3>
                        <div className="wallet-balance">₹{wallet.balance}</div>
                        <div className="pending-payout">
                            Pending: ₹{wallet.pendingPayouts}
                        </div>
                        <button className="btn btn-primary">Withdraw Funds</button>
                    </div>
                </div>
                
                <div className="earnings-filter-box">
                    <div className="filter-tabs">
                        <button 
                            className={`tab ${timeFrame === 'daily' ? 'active' : ''}`}
                            onClick={() => setTimeFrame('daily')}
                        >
                            Daily
                        </button>
                        <button 
                            className={`tab ${timeFrame === 'weekly' ? 'active' : ''}`}
                            onClick={() => setTimeFrame('weekly')}
                        >
                            Weekly
                        </button>
                        <button 
                            className={`tab ${timeFrame === 'monthly' ? 'active' : ''}`}
                            onClick={() => setTimeFrame('monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
                
                <div className="earnings-history-box">
                    <h3 className="section-title">{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Earnings</h3>
                    
                    <div className="earnings-list">
                        {currentEarnings.map((item, index) => (
                            <div className="earnings-item" key={index}>
                                <div className="earnings-info">
                                    <div className="earnings-date">{item.date}</div>
                                    <div className="earnings-rides">{item.rides} rides</div>
                                </div>
                                <div className="earnings-amount">₹{item.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="earnings-summary-box">
                    <div className="summary-grid">
                        <div className="summary-card">
                            <h4>Average per Ride</h4>
                            <div className="summary-value">
                                ₹{Math.round(currentEarnings[0].amount / currentEarnings[0].rides)}
                            </div>
                        </div>
                        <div className="summary-card">
                            <h4>Total Rides</h4>
                            <div className="summary-value">
                                {currentEarnings[0].rides}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Earnings;
