import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseUrl } from '../Urls';

function HomeCreators() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/getAllAdmin`);
        setData(response.data);
        setLoading(false); 
      } catch (err) {
        setError(err); 
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-2xl">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Creators</h1>

      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.slice(0,8).map((admin) => (
            <div
              key={admin._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center">
                {admin.photo && admin.photo.url ? (
                  <img
                    src={admin.photo.url}
                    alt={admin.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-indigo-500 shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">No Image</span>
                  </div>
                )}

                <div className="text-center mt-4">
                  <p className="text-xl font-semibold text-gray-900">{admin.name}</p>
                  <p className="text-gray-600 text-sm uppercase tracking-wider">{admin.role}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    <strong>Email:</strong> {admin.email}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    <strong>Created At:</strong> {new Date(admin.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center w-full text-lg text-gray-600">No data available</div>
      )}
    </div>
  );
}

export default HomeCreators;
