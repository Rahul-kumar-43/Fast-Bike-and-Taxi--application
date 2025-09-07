import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DriverDashboard.css';
import TopBar from './TopBar';
import RideControl from './RideControl';
import Earnings from './Earnings';
import RideHistory from './RideHistory';
import Performance from './Performance';
import QuickActions from './QuickActions';
import BottomNav from './BottomNav';

function DriverDashboard() {
    const [activeTab, setActiveTab] = useState('home');
    const [driverData, setDriverData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in as driver
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userType = localStorage.getItem('userType');
        const userId = localStorage.getItem('userId');
        
        if (!isLoggedIn || userType !== 'driver') {
            navigate('/login');
            return;
        }
        
        // Fetch driver data
        fetchDriverData(userId);
    }, [navigate]);

    // Set dark mode based on online status when driver data changes
    useEffect(() => {
        if (driverData) {
            setIsDarkMode(!driverData.isOnline);
        }
    }, [driverData]);

    const fetchDriverData = async (driverId) => {
        try {
            setLoading(true);
            // In a real app, you would fetch this data from your API
            // For demo purposes, we'll use mock data
            
            // Simulating API call
            setTimeout(() => {
                const mockDriverData = {
                    id: driverId || '1',
                    name: 'Rahul Kumar',
                    profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
                    isOnline: true,
                    rating: 4.8,
                    totalTrips: 342,
                    driverLevel: 'Gold',
                    wallet: {
                        balance: 3850,
                        pendingPayouts: 750,
                    },
                    currentRide: null, // or ride object if there's an active ride
                    earnings: {
                        today: 750,
                        weekly: 4250,
                        monthly: 15750,
                    },
                    rideHistory: [
                        {
                            id: 'RID98765',
                            date: '2025-08-20',
                            passengerName: 'Amit Singh',
                            pickup: 'MG Road, Bangalore',
                            dropoff: 'Whitefield, Bangalore',
                            fare: 250,
                            distance: '12.5 km',
                            duration: '35 min',
                            rating: 5,
                            status: 'completed'
                        },
                        {
                            id: 'RID87654',
                            date: '2025-08-19',
                            passengerName: 'Priya Sharma',
                            pickup: 'HSR Layout, Bangalore',
                            dropoff: 'Electronic City, Bangalore',
                            fare: 320,
                            distance: '15.8 km',
                            duration: '42 min',
                            rating: 4,
                            status: 'completed'
                        },
                        {
                            id: 'RID76543',
                            date: '2025-08-19',
                            passengerName: 'Rohit Verma',
                            pickup: 'Koramangala, Bangalore',
                            dropoff: 'Indiranagar, Bangalore',
                            fare: 180,
                            distance: '8.2 km',
                            duration: '25 min',
                            rating: 5,
                            status: 'completed'
                        },
                        {
                            id: 'RID65432',
                            date: '2025-08-18',
                            passengerName: 'Meera Patel',
                            pickup: 'JP Nagar, Bangalore',
                            dropoff: 'Jayanagar, Bangalore',
                            fare: 150,
                            distance: '7.3 km',
                            duration: '22 min',
                            rating: 5,
                            status: 'completed'
                        },
                        {
                            id: 'RID54321',
                            date: '2025-08-18',
                            passengerName: 'Suresh Kumar',
                            pickup: 'Marathahalli, Bangalore',
                            dropoff: 'Bellandur, Bangalore',
                            fare: 120,
                            distance: '5.5 km',
                            duration: '18 min',
                            rating: 4,
                            status: 'completed'
                        }
                    ],
                    notifications: [
                        { id: 1, message: 'New promotion: Earn 2x during peak hours', read: false, time: '2 hours ago' },
                        { id: 2, message: 'Your weekly payout of ₹4250 has been processed', read: true, time: '1 day ago' },
                        { id: 3, message: "You've reached Gold driver status! Keep up the good work", read: true, time: '3 days ago' }
                    ]
                };
                
                setDriverData(mockDriverData);
                setLoading(false);
            }, 1500);
            
        } catch (error) {
            console.error('Error fetching driver data:', error);
            setError('Failed to load driver data. Please try again later.');
            setLoading(false);
        }
    };
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // For mobile view, close sidebar when a tab is selected
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };
    
    const toggleOnlineStatus = () => {
        if (driverData) {
            const newOnlineStatus = !driverData.isOnline;
            setDriverData({
                ...driverData,
                isOnline: newOnlineStatus
            });
            setIsDarkMode(!newOnlineStatus);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    if (loading) {
        return (
            <div className={`driver-dashboard-loading ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`driver-dashboard-error ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <p>{error}</p>
                <button onClick={() => fetchDriverData()}>Retry</button>
            </div>
        );
    }

    return (
        <div className={`driver-dashboard ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className={`driver-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <BottomNav 
                    activeTab={activeTab} 
                    onTabChange={handleTabChange} 
                    toggleSidebar={toggleSidebar}
                    isDarkMode={isDarkMode}
                    sidebarOpen={sidebarOpen}
                    driverData={driverData}
                />
            </div>
            
            <div className={`dashboard-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <TopBar 
                    driverData={driverData}
                    toggleOnlineStatus={toggleOnlineStatus}
                    toggleSidebar={toggleSidebar}
                    isDarkMode={isDarkMode}
                />
                
                <div className="main-content">
                    {activeTab === 'home' && (
                        <div className="dashboard-grid-layout">
                            <div className="grid-item grid-item-full">
                                <RideControl driverData={driverData} isDarkMode={isDarkMode} />
                            </div>
                            <div className="grid-item grid-item-full">
                                <QuickActions isDarkMode={isDarkMode} />
                            </div>
                            <div className="grid-item grid-item-full">
                                <div className="mini-history-preview">
                                    <RideHistory driverData={driverData} isDarkMode={isDarkMode} isPreview={true} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'earnings' && (
                        <Earnings driverData={driverData} isDarkMode={isDarkMode} />
                    )}
                    
                    {activeTab === 'rides' && (
                        <RideHistory driverData={driverData} isDarkMode={isDarkMode} />
                    )}
                    
                    {activeTab === 'performance' && (
                        <Performance driverData={driverData} isDarkMode={isDarkMode} />
                    )}
                    
                    {activeTab === 'account' && (
                        <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
                            <div className="card-header">
                                <h2 className="card-title">Account Settings</h2>
                            </div>
                            <div className="card-body">
                                <p>This section would contain account settings, documents, license information, etc.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DriverDashboard;
