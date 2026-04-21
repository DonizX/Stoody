import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-stoody.png";

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear(); // limpa XP, coins, search etc
    navigate("/"); // volta para login
  }

  return (
    <aside className="w-64 fixed h-screen bg-white shadow-md p-6 flex flex-col">

<div className="mb-10 flex justify-center">
  <img
    src={logo}
    alt="Stoody"
    className="h-22 object-contain"
  />
</div>
      <nav className="flex flex-col gap-3 flex-1">

        <button className="text-left px-3 py-2 hover:bg-gray-100 rounded">
          📚 Courses
        </button>

        <button className="text-left px-3 py-2 hover:bg-gray-100 rounded">
          🛒 Shop
        </button>

        <button className="text-left px-3 py-2 hover:bg-gray-100 rounded">
          👤 Profile
        </button>

        <button className="text-left px-3 py-2 hover:bg-gray-100 rounded">
          🏆 Leaderboard
        </button>

      </nav>

      <button
        onClick={handleLogout}
        className="text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded"
      >
        🚪 Logout
      </button>

    </aside>
  );
}

export default Sidebar;