import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function Trendings() {
  const { blogs } = useAuth();
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // Simulate loading time for fetching blogs
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data is loaded
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [blogs]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 }, // 3 items per row on laptop
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 }, // 2 items per row on tablet
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }, // 1 item per row on mobile
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Trendings</h1>

      {loading ? (
        // 🔹 Spinner while loading
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : blogs && blogs.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-8-px"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          partialVisible={false}
        >
          {blogs.slice(0, 40).map((element) => (
            <Link
              to={`/blogs/${element._id}`}
              key={element._id}
              className="p-4 bg-white border border-gray-400 rounded-lg shadow-lg mx-2 flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-indigo-500"
            >
              <div className="relative overflow-hidden rounded-t-lg w-full h-56 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                <img
                  src={element.blogImage.url}
                  alt={element.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow-md hover:bg-blue-400 transition-colors duration-300">
                  {element.category}
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-b-lg h-36 w-full flex flex-col justify-between transition-colors duration-300 hover:bg-gray-100">
                <h2 className="text-lg font-bold mb-2 text-gray-800 truncate">{element.title}</h2>
                <div className="flex items-center">
                  <img
                    src={element.adminImage || "https://via.placeholder.com/150"}
                    alt={element.adminName}
                    className="w-12 h-12 rounded-full object-cover mr-3 border-4 border-indigo-500 transition-transform duration-300 hover:rotate-6 hover:scale-110"
                  />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-700">{element.adminName}</p>
                    <p className="text-xs text-gray-500">Published Recently</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-600">No blogs available</p>
        </div>
      )}
    </div>
  );
}

export default Trendings;
