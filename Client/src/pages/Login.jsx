import React, { useState } from 'react';
import { loginUser } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); // ✅ context
  const navigate = useNavigate(); // ✅ redirect

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      console.log(res.data);

      alert("Login successful");

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      // ✅ store user in context
      login(res.data.user); // make sure backend sends user

      // ✅ redirect
      navigate("/");

    } catch (error) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Please login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-500">
              Don't have an account? 
            </span>
           <Link to="/signup" className="text-green-600 font-medium hover:underline ml-1">
              Sign Up
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;