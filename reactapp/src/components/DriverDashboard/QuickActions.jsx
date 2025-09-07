import React from 'react';

function QuickActions({ isDarkMode }) {
    const actionItems = [
        {
            id: 'support',
            icon: '🛟',
            label: 'Support',
            onClick: () => alert('Support clicked')
        },
        {
            id: 'schedule',
            icon: '📅',
            label: 'Schedule',
            onClick: () => alert('Schedule clicked')
        },
        {
            id: 'notifications',
            icon: '🔔',
            label: 'Notifications',
            onClick: () => alert('Notifications clicked')
        },
        {
            id: 'documents',
            icon: '📄',
            label: 'Documents',
            onClick: () => alert('Documents clicked')
        }
    ];
    
    return (
        <div className={`dashboard-card ${isDarkMode ? 'dark' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">Quick Actions</h2>
            </div>
            <div className="card-body">
                <div className="actions-header">
                    <h3 className="section-name">Quick Access</h3>
                </div>
                
                <div className="actions-grid">
                    {actionItems.map(item => (
                        <div 
                            key={item.id}
                            className="action-box"
                            onClick={item.onClick}
                        >
                            <div className="action-icon">{item.icon}</div>
                            <div className="action-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuickActions;
