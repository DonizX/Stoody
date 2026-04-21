import { useState } from "react";

function Navbar({
  level,
  xp,
  xpMax,
  coins,
  levelPulse,
  coinAnim,
  search,
  setSearch
}) {

  const courses = [
    "Learn English with Pokémon",
    "Japanese for Anime",
    "Spanish Basics"
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
    <header className="h-24 bg-white shadow flex flex-col px-8 justify-center gap-2">

      <div className="flex justify-between items-center">

        <div className="relative">

          <input
            value={search ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search courses..."
            className="border p-2 rounded w-64"
          />

          {suggestions.length > 0 && (
            <div className="absolute bg-white border w-64 mt-1 rounded shadow z-10">

              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => selectCourse(item)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}

            </div>
          )}

        </div>

        <div className="flex gap-6 items-center">

          <span className={levelPulse ? "animate-pulse text-purple-600" : ""}>
            Level {level}
          </span>

          <span className={coinAnim ? "text-green-500 animate-pulse" : ""}>
            💰 {coins}
          </span>

        </div>

      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${xpPercent}%` }}
        />
      </div>

    </header>
  );
}

export default Navbar;