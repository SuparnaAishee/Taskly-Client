import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";


const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare user data
    const userData = {
      email,
      password,
      username,
    };

    try {
      // Replace with your actual backend API endpoint
      const response = await fetch("https://your-backend-api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Assuming backend responds with user details after successful registration
      const data = await response.json();

      // Dispatch the register action to update the Redux state
      dispatch(register({ email: data.email, username: data.username }));

      alert("User registered successfully!");
      navigate("/"); // Redirect to home or login page after successful registration
    } catch (error) {
      alert(error.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Logo, Text & Illustration */}
      <div className="w-1/2 bg-cyan-100 flex flex-col justify-center items-center p-10 select-none">
        <img
          src="https://res.cloudinary.com/dwelabpll/image/upload/v1739538340/Screenshot_2025-02-14_153508-removebg-preview_ofbon8.png"
          alt="Logo"
          className="w-40 h-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-cyan-800">
          Welcome to TaskSync
        </h1>
        <p className="text-center text-gray-700 mt-2">
          “Manage your tasks efficiently and seamlessly.”
        </p>
        <img
          src="https://res.cloudinary.com/dwelabpll/image/upload/v1739538329/depositphotos_515228796-stock-illustration-online-registration-sign-login-account-removebg-preview_pnkkju.png"
          alt="Illustration"
          className="w-full h-auto mt-6"
        />
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white select-none">
        <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-gray-600">Enter your details to register</p>
        <form
          className="w-full max-w-sm mt-4 select-text"
          onSubmit={handleRegister}
        >
          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 border rounded mt-2 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded mt-2 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded mt-2 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white p-3 mt-4 rounded hover:bg-cyan-700 transition-all"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <a href="/" className="text-cyan-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
