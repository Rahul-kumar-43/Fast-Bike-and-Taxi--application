import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import './AdminBikeDetails.css';

function AdminBikeDetails() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getAllDrivers();
            setBikes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bikes:', error);
            setError('Failed to load bike details. Please try again later.');
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBikes = bikes.filter(bike => {
        const searchLower = searchTerm.toLowerCase();
        return (
            bike.name?.toLowerCase().includes(searchLower) ||
            bike.phoneNumber?.toLowerCase().includes(searchLower) ||
            bike.bikeNumber?.toLowerCase().includes(searchLower) ||
            (bike.email && bike.email.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="bikes-dashboard">
            <div className="page-header">
                <h1 className="page-title">Bike Details</h1>
                <p className="page-description">View all registered bike taxis</p>
            </div>
            
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">All Bikes</h2>
                    <div className="header-actions">
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search bikes..." 
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <i className="fas fa-search search-icon"></i>
                        </div>
                        <button className="btn btn-primary">
                            <i className="fas fa-motorcycle"></i> Add Bike
                        </button>
                    </div>
                </div>
                
                <div className="card-body">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading bikes...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <div className="error-icon">⚠️</div>
                            <p className="error-message">{error}</p>
                            <button 
                                className="btn btn-primary"
                                onClick={fetchBikes}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="bikes-grid">
                            {filteredBikes.length > 0 ? (
                                filteredBikes.map((bike, index) => (
                                    <div key={index} className="bike-card">
                                        <div className="bike-header">
                                            <h3 className="bike-name">{bike.name}</h3>
                                            <div className="bike-status">
                                                <span className="status-badge active">Active</span>
                                            </div>
                                        </div>
                                        <div className="bike-details">
                                            <div className="detail-item">
                                                <span className="detail-label">Bike Number:</span>
                                                <span className="detail-value">{bike.bikeNumber}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Age:</span>
                                                <span className="detail-value">{bike.age}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Phone:</span>
                                                <span className="detail-value">{bike.phoneNumber}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Email:</span>
                                                <span className="detail-value">{bike.email || 'Not provided'}</span>
                                            </div>
                                        </div>
                                        <div className="bike-actions">
                                            <button className="btn btn-outline">
                                                <i className="fas fa-edit"></i> Edit
                                            </button>
                                            <button className="btn btn-danger">
                                                <i className="fas fa-trash-alt"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-bikes">
                                    <i className="fas fa-motorcycle no-bikes-icon"></i>
                                    <p>{searchTerm ? 'No bikes match your search' : 'No bikes found'}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {!loading && !error && bikes.length > 0 && (
                    <div className="card-footer">
                        <div className="pagination-info">
                            Showing {filteredBikes.length} of {bikes.length} bikes
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminBikeDetails;
