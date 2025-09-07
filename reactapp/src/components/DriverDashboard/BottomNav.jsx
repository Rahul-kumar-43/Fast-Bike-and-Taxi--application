import React from 'react';

function BottomNav({ activeTab, onTabChange, toggleSidebar, isDarkMode, sidebarOpen, driverData }) {
    const navItems = [
        {
            id: 'home',
            icon: '🏠',
            label: 'Dashboard'
        },
        {
            id: 'earnings',
            icon: '💰',
            label: 'Earnings'
        },
        {
            id: 'rides',
            icon: '🚲',
            label: 'Ride History'
        },
        {
            id: 'performance',
            icon: '⭐',
            label: 'Performance'
        },
        {
            id: 'account',
            icon: '👤',
            label: 'Account'
        }
    ];
    
    return (
        <div className="sidebar-content">
            <div className="sidebar-header">
                <div className="logo" onClick={toggleSidebar}>
                    <div className={`logo-icon ${isDarkMode ? 'dark' : 'light'}`}>FB</div>
                    {sidebarOpen && <div className="logo-text">Fast Bike</div>}
                    <div 
                        className={`sidebar-toggle-icon ${!sidebarOpen ? 'closed' : ''}`}
                    >
                        {sidebarOpen ? '◀' : '▶'}
                    </div>
                </div>
            </div>
            
            <div className="sidebar-menu">
                {navItems.map(item => (
                    <div 
                        key={item.id}
                        className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <div className="item-icon">{item.icon}</div>
                        {sidebarOpen && <div className="item-text">{item.label}</div>}
                    </div>
                ))}
            </div>
            
            <div className="sidebar-footer">
                {sidebarOpen && (
                    <>
                        <p>Faster Bike Taxi © 2025</p>
                        <p>Driver Version 1.0</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default BottomNav;
