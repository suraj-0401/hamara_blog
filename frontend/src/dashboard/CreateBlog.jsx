import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../Urls";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/blogs/createBlog`,
        formData, // Include the form data here
        {
          headers: {
            authorization: `Bearer ${token}`, // Corrected authorization header
            "Content-Type": "multipart/form-data" // Set the content type for file upload
          }
        }
      );
    
    
    toast.success(data.message || "Blog created successfully");
    
    // Get the blog ID from the response
    const blogId = data.blogId;
    localStorage.setItem(blogId)
    // Set the blog ID in localStorage
    if (blogId) {
      localStorage.setItem('createdBlogId', blogId);
    }

      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data.message || "Please fill the required fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 bg-gray-50 ">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">Create Blog</h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Added required attribute for validation
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Blog Image</label>
            <div className="flex items-center justify-center mb-4">
              <img
                src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                alt="Preview"
                className="w-full max-w-sm h-auto rounded-md object-cover border-2 border-dashed border-gray-400"
              />
            </div>
            <input
              type="file"
              accept="image/*" // Limit file types to images
              onChange={changePhotoHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Added required attribute for validation
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">About</label>
            <textarea
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required // Added required attribute for validation
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
