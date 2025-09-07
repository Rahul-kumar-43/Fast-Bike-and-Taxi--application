import React, { useState, useEffect } from 'react';

function DisplayBikes() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllBiketaxi', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setBikes(data);
            } else {
                setError('Error fetching bike details');
            }
            setLoading(false);
        } catch (err) {
            setError('Error fetching bike details');
            setLoading(false);
            console.error('Error:', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Submitted Applications</h2>
            
            {loading && (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            )}
            
            {error && (
                <div className="text-center py-10 px-4 text-red-600 bg-red-50 rounded-lg">
                    <p className="text-xl font-medium">{error}</p>
                    <button 
                        onClick={fetchBikes} 
                        className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}
            
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {bikes.map((bike, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{bike.name}</h3>
                                <p className="py-1 text-gray-700"><span className="font-medium">Bike Number:</span> {bike.bikeNumber}</p>
                                <p className="py-1 text-gray-700"><span className="font-medium">Age:</span> {bike.age}</p>
                                <p className="py-1 text-gray-700"><span className="font-medium">Phone Number:</span> {bike.phoneNumber}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {!loading && !error && bikes.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-600">No applications found.</p>
                </div>
            )}
        </div>
    );
}

export default DisplayBikes;