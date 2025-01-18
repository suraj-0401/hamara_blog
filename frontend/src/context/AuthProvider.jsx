import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Urls";

// Create the AuthContext
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (parseError) {
        console.error("Error parsing stored user data:", parseError);
        setUserData(null);
      }
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage. Skipping API calls.");
        setError("User not authenticated.");
        return;
      }

      setLoading(true);

      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch profile
        const profileResponse = await axios.get(`${baseUrl}/api/users/getMyProfile`, { headers });
        setProfile(profileResponse.data);

        // Fetch blogs
        const blogsResponse = await axios.get(`${baseUrl}/api/blogs/getAllBlog`, { headers });
        setBlogs(blogsResponse.data);
      } catch (error) {
        console.error("Error during API calls:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        userData,
        setUserData,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const { blogs, profile, userData, setUserData, error, loading } = useContext(AuthContext);
  return { blogs, profile, userData, setUserData, error, loading };
};
