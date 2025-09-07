import React from 'react';
import { Link } from 'react-router-dom';

function Careers() {
    // Sample job listings
    const jobListings = [
        {
            id: 1,
            title: 'Senior Backend Developer',
            location: 'Bangalore',
            type: 'Full-time',
            department: 'Engineering'
        },
        {
            id: 2,
            title: 'UI/UX Designer',
            location: 'Remote',
            type: 'Full-time',
            department: 'Design'
        },
        {
            id: 3,
            title: 'Operations Manager',
            location: 'Mumbai',
            type: 'Full-time',
            department: 'Operations'
        },
        {
            id: 4,
            title: 'Marketing Specialist',
            location: 'Delhi',
            type: 'Full-time',
            department: 'Marketing'
        },
        {
            id: 5,
            title: 'Customer Support Representative',
            location: 'Hyderabad',
            type: 'Full-time',
            department: 'Customer Success'
        },
        {
            id: 6,
            title: 'Data Analyst',
            location: 'Bangalore',
            type: 'Full-time',
            department: 'Data Science'
        }
    ];

    // Sample departments
    const departments = [
        { name: 'Engineering', icon: '💻' },
        { name: 'Design', icon: '🎨' },
        { name: 'Operations', icon: '🔧' },
        { name: 'Marketing', icon: '📢' },
        { name: 'Customer Success', icon: '🤝' },
        { name: 'Data Science', icon: '📊' },
        { name: 'Finance', icon: '💰' },
        { name: 'Human Resources', icon: '👥' }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-black text-white py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
                    <p className="text-xl md:max-w-3xl">
                        Build the future of urban mobility with us. Discover exciting career opportunities at Faster Bike Taxi.
                    </p>
                </div>
            </div>
            
            {/* Why Join Us Section */}
            <div className="py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Join Faster Bike Taxi?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Growth & Impact</h3>
                            <p className="text-gray-700">
                                Be part of a rapidly growing startup that's transforming urban transportation in India.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Innovation Culture</h3>
                            <p className="text-gray-700">
                                We encourage new ideas and creative solutions to solve complex mobility challenges.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="text-4xl mb-4">🌱</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Learning & Development</h3>
                            <p className="text-gray-700">
                                Continuous opportunities to grow your skills and advance your career.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Benefits Section */}
            <div className="py-16 md:py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Benefits</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-lg font-medium text-gray-900">Competitive Salary</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🏥</div>
                            <h3 className="text-lg font-medium text-gray-900">Health Insurance</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">⏰</div>
                            <h3 className="text-lg font-medium text-gray-900">Flexible Work Hours</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🏠</div>
                            <h3 className="text-lg font-medium text-gray-900">Remote Work Options</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-lg font-medium text-gray-900">Learning Allowance</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🎮</div>
                            <h3 className="text-lg font-medium text-gray-900">Recreation Space</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🎁</div>
                            <h3 className="text-lg font-medium text-gray-900">Employee Discounts</h3>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🍽️</div>
                            <h3 className="text-lg font-medium text-gray-900">Free Lunches</h3>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Our Teams Section */}
            <div className="py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Teams</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {departments.map((dept, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{dept.icon}</div>
                                <h3 className="text-lg font-medium text-gray-900">{dept.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Open Positions Section */}
            <div className="py-16 md:py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Open Positions</h2>
                    
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                        <div className="grid grid-cols-5 p-4 bg-gray-100 font-medium text-gray-700">
                            <div className="col-span-2">Position</div>
                            <div>Department</div>
                            <div>Location</div>
                            <div>Type</div>
                        </div>
                        
                        {jobListings.map(job => (
                            <div key={job.id} className="grid grid-cols-5 p-4 border-t border-gray-200 hover:bg-gray-50">
                                <div className="col-span-2 font-medium text-black">{job.title}</div>
                                <div className="text-gray-600">{job.department}</div>
                                <div className="text-gray-600">{job.location}</div>
                                <div className="text-gray-600">{job.type}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <p className="mb-6 text-gray-700">
                            Don't see a position that matches your skills? Send us your resume anyway!
                        </p>
                        <a 
                            href="mailto:careers@fasterbiketaxi.com" 
                            className="inline-block py-3 px-8 bg-black text-white rounded-lg font-medium transition-all hover:bg-gray-800"
                        >
                            Contact Our Recruiting Team
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Call to Action */}
            <div className="py-16 md:py-24 px-4 bg-black text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
                    <p className="text-xl mb-8">
                        Join us in our mission to revolutionize transportation and build a more connected world.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            to="/about" 
                            className="py-3 px-8 bg-white text-black rounded-lg font-medium transition-all hover:bg-gray-100"
                        >
                            Learn More About Us
                        </Link>
                        <a 
                            href="mailto:careers@fasterbiketaxi.com" 
                            className="py-3 px-8 border border-white text-white rounded-lg font-medium transition-all hover:bg-white hover:text-black"
                        >
                            Send Your Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Careers;
