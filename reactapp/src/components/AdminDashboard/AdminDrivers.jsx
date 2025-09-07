import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import './AdminDrivers.css';

function AdminDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDriverId, setSelectedDriverId] = useState(null);

    useEffect(() => {
        // Fetch all drivers
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getAllDrivers();
            setDrivers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            setError('Failed to load drivers. Please try again later.');
            setLoading(false);
        }
    };

    const deleteDriver = async (id) => {
        if (window.confirm('Are you sure you want to delete this driver?')) {
            try {
                const response = await fetch(`http://localhost:8080/admin/deleteDriver/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to delete driver');
                }
                
                // Refresh the driver list after deletion
                fetchDrivers();
                
                // Show success message
                alert('Driver deleted successfully');
            } catch (error) {
                console.error('Error deleting driver:', error);
                alert('Failed to delete driver. Please try again.');
            }
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDrivers = drivers.filter(driver => {
        const searchLower = searchTerm.toLowerCase();
        return (
            driver.name?.toLowerCase().includes(searchLower) ||
            driver.phoneNumber?.toLowerCase().includes(searchLower) ||
            driver.bikeNumber?.toLowerCase().includes(searchLower) ||
            driver.email?.toLowerCase().includes(searchLower) ||
            String(driver.id).includes(searchLower)
        );
    });

    const handleDriverSelect = (id) => {
        setSelectedDriverId(id === selectedDriverId ? null : id);
    };

    return (
        <div className="drivers-dashboard">
            <div className="page-header">
                <h1 className="page-title">Driver Management</h1>
                <p className="page-description">View and manage all registered bike taxi drivers</p>
            </div>
            
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">All Drivers</h2>
                    <div className="header-actions">
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search drivers..." 
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <i className="fas fa-search search-icon"></i>
                        </div>
                        <button className="btn btn-primary">
                            <i className="fas fa-plus"></i> Add Driver
                        </button>
                    </div>
                </div>
                
                <div className="card-body">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading drivers...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <div className="error-icon">⚠️</div>
                            <p className="error-message">{error}</p>
                            <button 
                                className="btn btn-primary"
                                onClick={fetchDrivers}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Bike Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDrivers.length > 0 ? (
                                        filteredDrivers.map((driver) => (
                                            <React.Fragment key={driver.id}>
                                                <tr 
                                                    className={`data-row ${selectedDriverId === driver.id ? 'selected' : ''}`}
                                                    onClick={() => handleDriverSelect(driver.id)}
                                                >
                                                    <td>{driver.id}</td>
                                                    <td>{driver.name}</td>
                                                    <td>{driver.age}</td>
                                                    <td>{driver.phoneNumber}</td>
                                                    <td>{driver.email || 'Not provided'}</td>
                                                    <td>{driver.bikeNumber}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button 
                                                                className="btn-icon"
                                                                title="Edit"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    // Handle edit functionality
                                                                }}
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button 
                                                                className="btn-icon delete"
                                                                title="Delete"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteDriver(driver.id);
                                                                }}
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {selectedDriverId === driver.id && (
                                                    <tr className="detail-row">
                                                        <td colSpan="7">
                                                            <div className="driver-details">
                                                                <div className="detail-section">
                                                                    <h3>Driver Information</h3>
                                                                    <div className="detail-grid">
                                                                        <div className="detail-item">
                                                                            <span className="detail-label">ID:</span>
                                                                            <span className="detail-value">{driver.id}</span>
                                                                        </div>
                                                                        <div className="detail-item">
                                                                            <span className="detail-label">Name:</span>
                                                                            <span className="detail-value">{driver.name}</span>
                                                                        </div>
                                                                        <div className="detail-item">
                                                                            <span className="detail-label">Age:</span>
                                                                            <span className="detail-value">{driver.age}</span>
                                                                        </div>
                                                                        <div className="detail-item">
                                                                            <span className="detail-label">Phone:</span>
                                                                            <span className="detail-value">{driver.phoneNumber}</span>
                                                                        </div>
                                                                        <div className="detail-item">
                                                                            <span className="detail-label">Email:</span>
                                                                            <span className="detail-value">{driver.email || 'Not provided'}</span>
                                                                        </div>
                                                                        <div className="detail-item">
                                                                            <span className="detail-label">Bike Number:</span>
                                                                            <span className="detail-value">{driver.bikeNumber}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="detail-actions">
                                                                    <button className="btn btn-primary">Edit Driver</button>
                                                                    <button 
                                                                        className="btn btn-danger"
                                                                        onClick={() => deleteDriver(driver.id)}
                                                                    >
                                                                        Delete Driver
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="no-data">
                                                {searchTerm ? 'No drivers match your search' : 'No drivers found'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                
                {!loading && !error && drivers.length > 0 && (
                    <div className="card-footer">
                        <div className="pagination-info">
                            Showing {filteredDrivers.length} of {drivers.length} drivers
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDrivers;
