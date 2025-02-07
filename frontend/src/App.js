import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";

// Lazy load components
const Home = lazy(() => import("../src/components/Home"));
const Blogs = lazy(() => import("../src/pages/Blogs"));
const Contact = lazy(() => import("../src/pages/Contact"));
const Creators = lazy(() => import("../src/pages/Creators"));
const Dashboard = lazy(() => import("../src/pages/Dashboard"));
const Login = lazy(() => import("../src/pages/Login"));
const Signup = lazy(() => import("../src/pages/Signup"));
const BlogDetail = lazy(() => import("./pages/BlogDetails"));
const MyBlogs = lazy(() => import("./dashboard/MyBlogs"));
const UpdateBlog = lazy(() => import("./dashboard/UpdateBlog"));
const Search = lazy(() => import("./pages/Search"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/login", "/signup", "/dashboard"].includes(location.pathname);

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/search" element={<Search />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-blogs/:id" element={<MyBlogs />} />
            <Route path="/update-blog/:id" element={<UpdateBlog />} />
          </Route>

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      {!hideNavbarFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;