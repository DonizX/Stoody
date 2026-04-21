import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BackgroundLoop from "./components/BackgroundLoop";

function App() {
  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0);
  const [coins, setCoins] = useState(() => Number(localStorage.getItem("coins")) || 0);
  const [level, setLevel] = useState(() => Number(localStorage.getItem("level")) || 1);
  const [xpMax, setXpMax] = useState(() => Number(localStorage.getItem("xpMax")) || 100);

  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");

  const [levelPulse, setLevelPulse] = useState(false);
  const [coinAnim, setCoinAnim] = useState(false);

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("coins", coins);
    localStorage.setItem("level", level);
    localStorage.setItem("xpMax", xpMax);
    localStorage.setItem("search", search);
  }, [xp, coins, level, xpMax, search]);

  function addXP(amount) {
    setXp((prev) => {
      let newXp = prev + amount;
      let newLevel = level;
      let newXpMax = xpMax;

      while (newXp >= newXpMax) {
        newXp -= newXpMax;
        newLevel += 1;
        newXpMax = Math.floor(newXpMax * 1.3);

        setLevelPulse(true);
        setTimeout(() => setLevelPulse(false), 3000);
      }

      setLevel(newLevel);
      setXpMax(newXpMax);

      return newXp;
    });
  }

  function addCoins(amount) {
    setCoinAnim(true);
    setCoins((prev) => prev + amount);

    setTimeout(() => setCoinAnim(false), 3000);
  }

  return (
    <BrowserRouter>

      {/* 🔥 BACKGROUND AGORA ESTÁ SENDO USADO */}
      <BackgroundLoop />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <Home
              xp={xp}
              xpMax={xpMax}
              coins={coins}
              level={level}
              addXP={addXP}
              addCoins={addCoins}
              levelPulse={levelPulse}
              coinAnim={coinAnim}
              search={search}
              setSearch={setSearch}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;