import React, { useState } from "react";
import "./Login.css"; // Import external CSS file for styles
import { Link, useNavigate } from "react-router-dom"; // Correct import
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../Urls";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!role) {
      toast.error("Please select a role.");
      return;
    }
  
    const payload = { name, email, password, role };
  
    console.log("Payload:", payload);
  
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response:", data);
      toast.success("User Registered successfully");
      navigate("/login");
  
      // Reset form state
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to register user. Please try again.");
      }
    }
  };
  
  

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Simple App
          </h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <Link
              to="#"
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <form
            className="bg-white rounded-md shadow-lg p-4"
            onSubmit={handleSignup}
          >
            <h1 className="text-gray-800 text-xl font-bold mb-2">
              Hello Again!
            </h1>
            <p className="text-sm text-gray-600 mb-6">Welcome Back</p>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <select
                name="role"
                className="w-full outline-none border-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Your Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <input
                id="name"
                className="w-full outline-none border-none"
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <input
                id="email"
                className="w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border mb-6 py-1 px-2 rounded-lg">
              <input
                className="w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 py-1 rounded-lg hover:bg-indigo-700 transition text-white font-semibold"
            >
              Signup
            </button>

            <div className="flex justify-between mt-4">
              <Link to="/login" className="text-sm hover:text-blue-500">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
