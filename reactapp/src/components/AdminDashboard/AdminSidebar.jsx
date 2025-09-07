import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <div 
                    className="logo" 
                    onClick={toggleSidebar} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            toggleSidebar();
                            e.preventDefault();
                        }
                    }}
                    role="button" 
                    tabIndex="0"
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <span className="logo-icon">FBT</span>
                    {isOpen && (
                        <>
                            <span className="logo-text">Fast Bike Taxi</span>
                            <span className="sidebar-toggle-icon">
                                <i className="fas fa-chevron-left"></i>
                            </span>
                        </>
                    )}
                    {!isOpen && (
                        <span className="sidebar-toggle-icon closed">
                            <i className="fas fa-chevron-right"></i>
                        </span>
                    )}
                </div>
            </div>
            
            <div className="sidebar-menu">
                <NavLink 
                    to="/admin/drivers" 
                    className={({ isActive }) => 
                        `sidebar-item ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="item-icon">
                        <i className="fas fa-users"></i>
                    </span>
                    {isOpen && <span className="item-text">Drivers</span>}
                </NavLink>
                
                <NavLink 
                    to="/admin/bikes" 
                    className={({ isActive }) => 
                        `sidebar-item ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="item-icon">
                        <i className="fas fa-motorcycle"></i>
                    </span>
                    {isOpen && <span className="item-text">Bike Details</span>}
                </NavLink>
                
                <NavLink 
                    to="/admin/messages" 
                    className={({ isActive }) => 
                        `sidebar-item ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="item-icon">
                        <i className="fas fa-envelope"></i>
                    </span>
                    {isOpen && <span className="item-text">Messages</span>}
                </NavLink>
                
                <NavLink 
                    to="/admin/rides" 
                    className={({ isActive }) => 
                        `sidebar-item ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="item-icon">
                        <i className="fas fa-route"></i>
                    </span>
                    {isOpen && <span className="item-text">Rides</span>}
                </NavLink>
                
                <NavLink 
                    to="/admin/analytics" 
                    className={({ isActive }) => 
                        `sidebar-item ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="item-icon">
                        <i className="fas fa-chart-line"></i>
                    </span>
                    {isOpen && <span className="item-text">Analytics</span>}
                </NavLink>
                
                <NavLink 
                    to="/admin/settings" 
                    className={({ isActive }) => 
                        `sidebar-item ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="item-icon">
                        <i className="fas fa-cog"></i>
                    </span>
                    {isOpen && <span className="item-text">Settings</span>}
                </NavLink>
            </div>
            
            <div className="sidebar-footer">
                <div className="version">v1.0.0</div>
            </div>
        </div>
    );
}

export default AdminSidebar;
