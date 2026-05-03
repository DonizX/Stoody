import { useState } from "react";
import { useGame } from "../context/GameContext";

function Navbar() {
  const { level, xp, xpMax, coins, levelPulse, coinAnim, search, setSearch } = useGame();

  const courses = [
    "Aprenda Japonês com Anime",
    "Inglês com Pokémon",
    "Espanhol Básico"
  ];

  const [suggestions, setSuggestions] = useState([]);

  function handleChange(value) {
    const safeValue = value ?? "";
    setSearch(safeValue);

    if (safeValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = courses.filter(course =>
      course.toLowerCase().includes(safeValue.toLowerCase())
    );

    setSuggestions(filtered);
  }

  function selectCourse(course) {
    setSearch(course ?? "");
    setSuggestions([]);
  }

  const xpPercent = xpMax ? (xp / xpMax) * 100 : 0;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-40">
      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col md:px-8 md:py-4 md:gap-3">
        <div className="flex justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs">
            <input
              value={search ?? ""}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Buscar cursos..."
              className="border-2 border-gray-200 p-2 rounded-lg w-full focus:border-purple-600 focus:outline-none transition text-sm"
            />

            {suggestions.length > 0 && (
              <div className="absolute bg-white border-2 border-gray-200 w-full mt-1 rounded-lg shadow-lg z-20">
                {suggestions.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => selectCourse(item)}
                    className="p-3 hover:bg-purple-50 cursor-pointer border-b last:border-b-0 transition text-sm"
                  >
                    <p className="font-medium text-gray-900">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-4 items-center">
            {/* Level */}
            <div className={`flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg whitespace-nowrap ${levelPulse ? "animate-pulse" : ""}`}>
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-xs text-gray-600">Nível</p>
                <p className="font-bold text-purple-600">{level}</p>
              </div>
            </div>

            {/* Coins */}
            <div className={`flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg whitespace-nowrap ${coinAnim ? "animate-pulse" : ""}`}>
              <span className="text-lg">💰</span>
              <div>
                <p className="text-xs text-gray-600">Moedas</p>
                <p className="font-bold text-yellow-600">{coins}</p>
              </div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-600">Progresso XP</span>
            <span className="text-xs font-semibold text-gray-600">{xp}/{xpMax}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col px-4 py-3 gap-3">
        {/* First Row: Stats */}
        <div className="flex gap-2 justify-between">
          {/* Level */}
          <div className={`flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-lg flex-1 ${levelPulse ? "animate-pulse" : ""}`}>
            <span className="text-sm">⭐</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-600">Nível</p>
              <p className="font-bold text-purple-600 text-sm">{level}</p>
            </div>
          </div>

          {/* Coins */}
          <div className={`flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg flex-1 ${coinAnim ? "animate-pulse" : ""}`}>
            <span className="text-sm">💰</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-600">Moedas</p>
              <p className="font-bold text-yellow-600 text-sm">{coins}</p>
            </div>
          </div>
        </div>

        {/* Second Row: Search */}
        <div className="relative">
          <input
            value={search ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Buscar cursos..."
            className="border-2 border-gray-200 p-2 rounded-lg w-full focus:border-purple-600 focus:outline-none transition text-sm"
          />

          {suggestions.length > 0 && (
            <div className="absolute bg-white border-2 border-gray-200 w-full mt-1 rounded-lg shadow-lg z-20">
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => selectCourse(item)}
                  className="p-2 hover:bg-purple-50 cursor-pointer border-b last:border-b-0 transition text-xs"
                >
                  <p className="font-medium text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Third Row: XP Bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-600">XP</span>
            <span className="text-xs font-semibold text-gray-600">{xp}/{xpMax}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;