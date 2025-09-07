import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ApplyForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bikeNumber: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        if (!formData.age) tempErrors.age = 'Age is required';
        if (!formData.bikeNumber) tempErrors.bikeNumber = 'Bike Number is required';
        if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone Number is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        
        // Enhanced password validation
        if (!formData.password) {
            tempErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            tempErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Za-z]/.test(formData.password)) {
            tempErrors.password = 'Password must contain at least one letter';
        } else if (!/[0-9]/.test(formData.password)) {
            tempErrors.password = 'Password must contain at least one number';
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
            tempErrors.password = 'Password must contain at least one special character';
        }
        
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const submitData = {
                    ...formData,
                    age: parseInt(formData.age)
                };
                
                // Remove confirmPassword as it's not needed in the backend
                delete submitData.confirmPassword;

                const response = await fetch('http://localhost:8080/addBiketaxi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submitData)
                });
                
                if (response.ok) {
                    setShowSuccessPopup(true);
                    setFormData({
                        name: '',
                        age: '',
                        bikeNumber: '',
                        phoneNumber: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                    setErrors({});
                } else {
                    // Handle password validation errors from backend
                    const errorData = await response.json();
                    if (errorData && errorData.message && errorData.message.includes('Password')) {
                        setErrors({
                            ...errors,
                            password: errorData.message
                        });
                    } else {
                        console.error('Error submitting application:', errorData);
                    }
                }
            } catch (error) {
                console.error('Error details:', error);
            }
        }
    };

    const handleOkClick = () => {
        setShowSuccessPopup(false);
        navigate('/login');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                        <p className="text-gray-600 mb-6">Your application has been submitted successfully.</p>
                        <button 
                            onClick={handleOkClick}
                            className="w-full py-3 bg-black text-white rounded-lg font-medium transition-all hover:bg-gray-800"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-10">
                <h2 className="text-3xl font-bold text-center mb-8 text-black">Apply to Join</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-800">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                        <label htmlFor="bikeNumber" className="block mb-2 font-medium text-gray-800">Bike Number:</label>
                        <input
                            type="text"
                            id="bikeNumber"
                            name="bikeNumber"
                            value={formData.bikeNumber}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.bikeNumber && <span className="text-red-500 text-sm mt-1 block">{errors.bikeNumber}</span>}
                    </div>

                    <div>
                        <label htmlFor="age" className="block mb-2 font-medium text-gray-800">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="18"
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.age && <span className="text-red-500 text-sm mt-1 block">{errors.age}</span>}
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 font-medium text-gray-800">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.phoneNumber && <span className="text-red-500 text-sm mt-1 block">{errors.phoneNumber}</span>}
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-800">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-800">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter a strong password"
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        <div className="mt-1 text-sm text-gray-500">
                            Password must be at least 8 characters and include a letter, number, and special character.
                        </div>
                        {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-800">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-black focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-black text-white rounded-lg font-medium transition-all hover:bg-gray-800 mt-6"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ApplyForm;