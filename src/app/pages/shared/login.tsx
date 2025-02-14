import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setAuth: (auth: boolean) => void;
}

const Login: React.FC<Props> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "user@gmail.com" && password === "123456") {
      setAuth(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Logo, Text & Image */}
      <div className="w-1/2 bg-cyan-100 flex flex-col justify-center items-center p-10 select-none">
        <img
          src="https://res.cloudinary.com/dwelabpll/image/upload/v1739538340/Screenshot_2025-02-14_153508-removebg-preview_ofbon8.png"
          alt="Logo"
          className="w-40 h-auto mb-4"
        />
        {/* Added Text Below Logo */}
        <h1 className="text-2xl font-bold text-cyan-800">
          Welcome to TaskSync
        </h1>
        <p className="text-center text-gray-700 mt-2">
          "Manage your tasks efficiently and
          seamlessly."
        </p>
        <img
          src="https://res.cloudinary.com/dwelabpll/image/upload/v1739538329/depositphotos_515228796-stock-illustration-online-registration-sign-login-account-removebg-preview_pnkkju.png"
          alt="Illustration"
          className="w-full h-auto mt-6"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white select-none">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-gray-600">Enter your email to sign in</p>
        <form
          className="w-full max-w-sm mt-4 select-text"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded mt-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded mt-2 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white p-3 mt-4 rounded hover:bg-cyan-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4">
          New user?{" "}
          <a href="/register" className="text-cyan-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
