import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loginStatus = localStorage.getItem('isLoggedIn');
        const storedUserType = localStorage.getItem('userType');
        setIsLoggedIn(loginStatus === 'true');
        setUserType(storedUserType || '');
    }, []);

    const handleLogout = () => {
        // Clear login status
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('adminUsername');
        setIsLoggedIn(false);
        setUserType('');
        // Redirect to home page
        navigate('/');
        // Close mobile menu after logout
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-black text-white px-4 py-4 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={closeMenu}>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight cursor-pointer">Faster Bike Taxi</h1>
                    </Link>
                    <button 
                        className="md:hidden p-2 focus:outline-none" 
                        onClick={toggleMenu} 
                        aria-label="Menu"
                    >
                        <div className="w-6 flex flex-col items-end">
                            <span className={`block h-0.5 w-6 bg-white mb-1.5 transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'w-6 opacity-0' : 'w-5'}`}></span>
                            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
                        </div>
                    </button>
                </div>
                
                <div className={`${menuOpen ? 'flex' : 'hidden md:flex'} flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0`}>
                    <Link to="/" 
                        className="py-2 px-3 hover:bg-gray-800 rounded transition-colors" 
                        onClick={closeMenu}>Home</Link>
                    <Link to="/services" 
                        className="py-2 px-3 hover:bg-gray-800 rounded transition-colors" 
                        onClick={closeMenu}>Services</Link>
                    <Link to="/contact" 
                        className="py-2 px-3 hover:bg-gray-800 rounded transition-colors" 
                        onClick={closeMenu}>Contact Us</Link>
                    
                    {isLoggedIn && userType === 'admin' ? (
                        <>
                            <Link to="/admin/drivers" 
                                className="py-2 px-3 bg-blue-600 rounded transition-colors" 
                                onClick={closeMenu}>Admin Panel</Link>
                            <button 
                                onClick={handleLogout} 
                                className="py-2 px-4 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
                                Logout
                            </button>
                        </>
                    ) : isLoggedIn && userType === 'driver' ? (
                        <>
                            <Link to="/driver/dashboard" 
                                className="py-2 px-3 bg-green-600 rounded transition-colors" 
                                onClick={closeMenu}>Driver Dashboard</Link>
                            <button 
                                onClick={handleLogout} 
                                className="py-2 px-4 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
                                Logout
                            </button>
                        </>
                    ) : isLoggedIn ? (
                        <button 
                            onClick={handleLogout} 
                            className="py-2 px-4 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" 
                            className="py-2 px-4 bg-white text-black rounded-full hover:bg-gray-100 transition-colors" 
                            onClick={closeMenu}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;