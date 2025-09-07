import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import './AdminContactMessages.css';

function AdminContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('ALL'); // ALL, DRIVER, USER, GUEST

    useEffect(() => {
        // Fetch messages
        fetchMessages();
    }, []);

    const fetchMessages = async (messageType = 'ALL') => {
        try {
            setLoading(true);
            const data = await ApiService.getAllMessages(messageType);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to load messages. Please try again later.');
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        fetchMessages(newFilter);
    };

    const handleDeleteMessage = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await ApiService.deleteMessage(id);
                // Refresh the messages list
                fetchMessages(filter);
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message. Please try again.');
            }
        }
    };

    const formatDateTime = (dateTimeString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateTimeString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="messages-dashboard">
            <div className="page-header">
                <h1 className="page-title">Contact Messages</h1>
                <p className="page-description">View and manage messages from users and guests</p>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">Contact Messages</h2>
                    <div className="filter-container">
                        <button 
                            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('ALL')}
                        >
                            All
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'DRIVER' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('DRIVER')}
                        >
                            Driver
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'USER' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('USER')}
                        >
                            User
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'GUEST' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('GUEST')}
                        >
                            Guest
                        </button>
                    </div>
                </div>

                <div className="card-body">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading messages...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <div className="error-icon">⚠️</div>
                            <p className="error-message">{error}</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => fetchMessages(filter)}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="messages-container">
                            {messages.length === 0 ? (
                                <div className="no-messages">
                                    <i className="fas fa-inbox empty-icon"></i>
                                    <p>No messages found</p>
                                </div>
                            ) : (
                                <div className="message-list">
                                    {messages.map((message) => (
                                        <div key={message.id} className="message-card">
                                            <div className="message-header">
                                                <div className="message-info">
                                                    <h3 className="message-subject">{message.subject || 'No Subject'}</h3>
                                                    <div className="message-meta">
                                                        <span className="message-sender">From: {message.name}</span>
                                                        <span className="message-email">Email: {message.email}</span>
                                                        {message.phoneNumber && (
                                                            <span className="message-phone">Phone: {message.phoneNumber}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="message-right">
                                                    <span className={`message-badge ${message.userType.toLowerCase()}`}>
                                                        {message.userType}
                                                    </span>
                                                    <span className="message-date">
                                                        {message.createdAt ? formatDateTime(message.createdAt) : 'No date'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="message-content">
                                                {message.message}
                                            </div>
                                            <div className="message-actions">
                                                <button 
                                                    className="btn-icon reply"
                                                    title="Reply"
                                                    onClick={() => window.open(`mailto:${message.email}`)}
                                                >
                                                    <i className="fas fa-reply"></i>
                                                </button>
                                                <button 
                                                    className="btn-icon delete"
                                                    title="Delete"
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminContactMessages;
