import React, { useState } from 'react';

function AdminHeader({ toggleSidebar, adminInfo, handleLogout }) {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    
    // Mock notifications
    const notifications = [
        { id: 1, message: 'New driver application received', time: '5 minutes ago', read: false },
        { id: 2, message: 'New contact message from user', time: '1 hour ago', read: false },
        { id: 3, message: 'System update completed successfully', time: '3 hours ago', read: true },
    ];
    
    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        if (userMenuOpen) setUserMenuOpen(false);
    };
    
    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
        if (notificationsOpen) setNotificationsOpen(false);
    };
    
    const unreadNotifications = notifications.filter(n => !n.read).length;
    
    return (
        <header className="admin-header">
            <div className="header-left">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </button>
                <h2 className="header-title">Admin Dashboard</h2>
            </div>
            
            <div className="header-right">
                <div className="header-actions">
                    <div className="notification-wrapper">
                        <button className="notification-toggle" onClick={toggleNotifications}>
                            <i className="fas fa-bell"></i>
                            {unreadNotifications > 0 && (
                                <span className="notification-badge">{unreadNotifications}</span>
                            )}
                        </button>
                        
                        {notificationsOpen && (
                            <div className="notification-dropdown">
                                <div className="dropdown-header">
                                    <h3>Notifications</h3>
                                    <button className="mark-all-read">Mark all as read</button>
                                </div>
                                <div className="notification-list">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div 
                                                key={notification.id} 
                                                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                            >
                                                <div className="notification-content">
                                                    <p className="notification-message">{notification.message}</p>
                                                    <span className="notification-time">{notification.time}</span>
                                                </div>
                                                <button className="mark-read">
                                                    <i className="fas fa-circle"></i>
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-notifications">
                                            <p>No notifications</p>
                                        </div>
                                    )}
                                </div>
                                <div className="dropdown-footer">
                                    <button className="view-all">View all notifications</button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="user-wrapper">
                        <button className="user-toggle" onClick={toggleUserMenu}>
                            <div className="user-avatar">
                                {adminInfo.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name">{adminInfo.username}</span>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        
                        {userMenuOpen && (
                            <div className="user-dropdown">
                                <div className="user-dropdown-header">
                                    <div className="user-avatar large">
                                        {adminInfo.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-info">
                                        <h4>{adminInfo.username}</h4>
                                        <p>{adminInfo.role}</p>
                                    </div>
                                </div>
                                <div className="user-dropdown-menu">
                                    <button className="dropdown-item">
                                        <i className="fas fa-user"></i>
                                        <span>My Profile</span>
                                    </button>
                                    <button className="dropdown-item">
                                        <i className="fas fa-cog"></i>
                                        <span>Account Settings</span>
                                    </button>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
