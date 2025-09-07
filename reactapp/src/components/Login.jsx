import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { useAuth } from '../services/AuthContext';

function Login() {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        username: '',
        password: ''
    });
    const [loginType, setLoginType] = useState('driver'); // 'driver' or 'admin'
    const [driverLoginMethod, setDriverLoginMethod] = useState('phone'); // 'phone' or 'email'
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const toggleLoginType = (type) => {
        setLoginType(type);
        setErrors({}); // Clear errors when switching modes
    };

    const toggleDriverLoginMethod = (method) => {
        setDriverLoginMethod(method);
        setErrors({}); // Clear errors when switching login method
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (loginType === 'driver') {
            if (driverLoginMethod === 'phone') {
                // Phone number validation for driver
                if (!formData.phoneNumber) {
                    newErrors.phoneNumber = 'Phone number is required';
                    isValid = false;
                } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
                    newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
                    isValid = false;
                }
            } else {
                // Email validation for driver
                if (!formData.email) {
                    newErrors.email = 'Email is required';
                    isValid = false;
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    newErrors.email = 'Please enter a valid email address';
                    isValid = false;
                }
            }
        } else {
            // Username validation for admin
            if (!formData.username) {
                newErrors.username = 'Username is required';
                isValid = false;
            }
        }

        // Password validation for both
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsLoading(true);
            
            try {
                let response;
                
                if (loginType === 'driver') {
                    // Prepare driver login payload based on login method
                    const loginPayload = {
                        password: formData.password
                    };
                    
                    if (driverLoginMethod === 'phone') {
                        loginPayload.phoneNumber = formData.phoneNumber;
                    } else {
                        loginPayload.email = formData.email;
                    }
                    
                    // Bike taxi login
                    response = await ApiService.biketaxiLogin(loginPayload);
                    
                    if (response && response.authenticated) {
                        // Store token and user info using AuthContext
                        login({
                            token: response.token,
                            userType: 'driver',
                            userId: response.userId,
                            name: response.name
                        });
                        
                        // Redirect to driver dashboard after login
                        navigate('/driver/dashboard');
                    } else {
                        setErrors({ auth: 'Invalid driver credentials. Please try again.' });
                    }
                } else {
                    // Admin login
                    response = await ApiService.adminLogin({
                        username: formData.username,
                        password: formData.password
                    });
                    
                    if (response && response.authenticated) {
                        // Store token and user info using AuthContext
                        login({
                            token: response.token,
                            userType: 'admin',
                            userId: response.adminId,
                            username: response.username
                        });
                        
                        // Redirect to admin dashboard after login
                        navigate('/admin/drivers');
                    } else {
                        setErrors({ auth: 'Invalid admin credentials. Please try again.' });
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrors({ auth: 'Login failed. Please try again later.' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] py-10 px-4 bg-white">
            <form className="flex flex-col gap-6 bg-white p-6 md:p-10 w-full max-w-md rounded-xl shadow-md border border-gray-200" onSubmit={handleSubmit}>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-black tracking-tight mb-2">Login</h2>
                
                {/* Login Type Toggle */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mx-auto">
                    <button 
                        type="button"
                        onClick={() => toggleLoginType('driver')}
                        className={`py-2 px-4 rounded-md transition-colors ${
                            loginType === 'driver' 
                                ? 'bg-white shadow-sm text-black font-medium' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Driver
                    </button>
                    <button 
                        type="button"
                        onClick={() => toggleLoginType('admin')}
                        className={`py-2 px-4 rounded-md transition-colors ${
                            loginType === 'admin' 
                                ? 'bg-white shadow-sm text-black font-medium' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Admin
                    </button>
                </div>
                
                {/* Dynamic form fields based on login type */}
                {loginType === 'driver' ? (
                    <>
                        {/* Toggle between phone and email login */}
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full">
                            <button 
                                type="button"
                                onClick={() => toggleDriverLoginMethod('phone')}
                                className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                                    driverLoginMethod === 'phone' 
                                        ? 'bg-white shadow-sm text-black font-medium' 
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Phone
                            </button>
                            <button 
                                type="button"
                                onClick={() => toggleDriverLoginMethod('email')}
                                className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                                    driverLoginMethod === 'email' 
                                        ? 'bg-white shadow-sm text-black font-medium' 
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Email
                            </button>
                        </div>
                        
                        {driverLoginMethod === 'phone' ? (
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-black">Phone Number</label>
                                <div className="flex items-center border border-gray-200 bg-gray-50 px-4 h-12 rounded-lg focus-within:border-black focus-within:bg-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#151717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <input 
                                        placeholder="Enter your Phone Number" 
                                        className="ml-3 bg-transparent w-full h-full outline-none text-black" 
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.phoneNumber && <span className="text-red-500 text-sm ml-1">{errors.phoneNumber}</span>}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-black">Email</label>
                                <div className="flex items-center border border-gray-200 bg-gray-50 px-4 h-12 rounded-lg focus-within:border-black focus-within:bg-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#151717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <input 
                                        placeholder="Enter your Email" 
                                        className="ml-3 bg-transparent w-full h-full outline-none text-black" 
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-black">Username</label>
                        <div className="flex items-center border border-gray-200 bg-gray-50 px-4 h-12 rounded-lg focus-within:border-black focus-within:bg-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#151717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <input 
                                placeholder="Enter your Username" 
                                className="ml-3 bg-transparent w-full h-full outline-none text-black" 
                                type="text"
                                name="username"
                                value={formData.username || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.username && <span className="text-red-500 text-sm ml-1">{errors.username}</span>}
                    </div>
                )}
                
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-black">Password</label>
                    <div className="flex items-center border border-gray-200 bg-gray-50 px-4 h-12 rounded-lg focus-within:border-black focus-within:bg-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" fill="#151717"></path>
                            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" fill="#151717"></path>
                        </svg>
                        <input 
                            placeholder="Enter your Password" 
                            className="ml-3 bg-transparent w-full h-full outline-none text-black" 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password}</span>}
                </div>
                
                {errors.auth && (
                    <div className="text-center text-red-500 font-medium p-3 bg-red-50 rounded-lg">
                        {errors.auth}
                    </div>
                )}
                
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="accent-black" />
                        <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                    </div>
                    <span className="text-sm font-medium text-black underline cursor-pointer">Forgot password?</span>
                </div>
                
                <button 
                    className={`bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : (loginType === 'driver' ? 'Login as Driver' : 'Login as Admin')}
                </button>
                
                {loginType === 'driver' && (
                    <div className="text-center text-sm text-gray-600 mt-4">
                        <p>Are you a Bike Taxi driver? <a href="/apply" className="text-black font-medium underline">Apply here</a></p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Login;
