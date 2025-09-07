import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './AdminDashboard.css';

function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [adminInfo, setAdminInfo] = useState({
        username: '',
        role: 'Administrator'
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if user is logged in as admin
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userType = localStorage.getItem('userType');
        const adminUsername = localStorage.getItem('adminUsername');
        
        if (!isLoggedIn || userType !== 'admin') {
            navigate('/login');
            return;
        }
        
        setAdminInfo(prev => ({
            ...prev,
            username: adminUsername || 'Admin'
        }));
        
        // If we're at the root admin dashboard path, redirect to drivers page
        if (location.pathname === '/admin') {
            navigate('/admin/drivers');
        }
    }, [navigate, location.pathname]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('adminUsername');
        navigate('/login');
    };

    const handleOverlayClick = () => {
        // Only close sidebar when clicking overlay on mobile view
        const isMobile = window.innerWidth <= 768;
        if (isMobile && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div 
                className={`dashboard-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
                onClick={handleOverlayClick}
            >
                <AdminHeader 
                    toggleSidebar={toggleSidebar} 
                    adminInfo={adminInfo}
                    handleLogout={handleLogout}
                />
                
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
