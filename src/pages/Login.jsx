import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-stoody.png";
import fundo from "../assets/idiomas.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (email.includes("@") && password.trim() !== "") {
      navigate("/home");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* NAVBAR */}
      <nav className="w-full px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md">

        <img src={logo} className="h-24 object-contain" alt="Stoody" />

        <button className="bg-purple-600 text-white px-6 py-2 rounded-full">
          Sign Up
        </button>

      </nav>

      {/* FORM */}
      <div className="flex flex-1 items-center justify-center">

        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-xl shadow-md w-[400px]"
        >

          <h1 className="text-2xl font-bold mb-2 text-center">
            Welcome back!
          </h1>

          <p className="text-gray-500 text-center mb-6">
            Continue your linguistic journey
          </p>

          <input
            className="w-full p-3 border rounded mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">

            <input
              className="w-full p-3 border rounded"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-sm text-purple-600"
            >
              {showPass ? "Hide" : "Show"}
            </button>

          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 text-white py-3 rounded"
          >
            Log In
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;