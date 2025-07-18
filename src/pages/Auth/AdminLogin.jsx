import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../redux/slices/authSlice';

import { useNavigate } from "react-router-dom";

import API from "../../url";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // ✅ Store user in redux
      dispatch(loginSuccess(res.data));

      // ✅ Navigate if admin
      if (res.data.isAdmin) {
        navigate("/");
      } else {
        setError("Not authorized as admin");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1f002b] to-[#0f0f23] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#0a0a0a] border border-[#8000ff] text-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6 backdrop-blur-md"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-400 drop-shadow">
          Admin Login
        </h2>

        {error && (
          <div className="text-red-400 text-sm text-center font-mono animate-pulse">
            ❌ {error}
          </div>
        )}

        <input
          type="text"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-[#7200ca] rounded-md bg-black text-cyan-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-[#7200ca] rounded-md bg-black text-cyan-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-cyan-300 hover:text-cyan-500 transition duration-200"
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-[#6a00ff] to-cyan-500 hover:from-[#4a00b3] hover:to-cyan-400 text-white"
          }`}
        >
          {loading ? "⏳ Logging in..." : "🚀 Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
