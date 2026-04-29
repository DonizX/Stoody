import { createContext, useContext, useState, useEffect, useCallback } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  // Estado de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

  // Estado principal
  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0);
  const [coins, setCoins] = useState(() => Number(localStorage.getItem("coins")) || 0);
  const [level, setLevel] = useState(() => Number(localStorage.getItem("level")) || 1);
  const [xpMax, setXpMax] = useState(() => Number(localStorage.getItem("xpMax")) || 100);
  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  
  // Cursos completados
  const [completedCourses, setCompletedCourses] = useState(() => {
    const saved = localStorage.getItem("completedCourses");
    return saved ? JSON.parse(saved) : [];
  });

  // Animações
  const [levelPulse, setLevelPulse] = useState(false);
  const [coinAnim, setCoinAnim] = useState(false);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("xp", xp);
    localStorage.setItem("coins", coins);
    localStorage.setItem("level", level);
    localStorage.setItem("xpMax", xpMax);
    localStorage.setItem("search", search);
    localStorage.setItem("completedCourses", JSON.stringify(completedCourses));
  }, [isAuthenticated, userName, userEmail, xp, coins, level, xpMax, search, completedCourses]);

  // Adicionar XP e gerenciar level
  const addXP = useCallback((amount) => {
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
  }, [level, xpMax]);

  // Adicionar moedas
  const addCoins = useCallback((amount) => {
    setCoinAnim(true);
    setTimeout(() => setCoinAnim(false), 1500);
    setCoins((prev) => prev + amount);
  }, []);

  // Marcar curso como completo
  const completeCourse = useCallback((courseId) => {
    setCompletedCourses((prev) => {
      if (!prev.includes(courseId)) {
        return [...prev, courseId];
      }
      return prev;
    });
  }, []);

  // Verificar se curso foi completado
  const isCourseCompleted = useCallback((courseId) => {
    return completedCourses.includes(courseId);
  }, [completedCourses]);

  // Resetar dados (para logout)
  const resetProgress = useCallback(() => {
    setIsAuthenticated(false);
    setUserName("");
    setUserEmail("");
    setXp(0);
    setLevel(1);
    setXpMax(100);
    setCoins(0);
    setCompletedCourses([]);
    setSearch("");
    localStorage.clear();
  }, []);

  // Sign up - criar novo usuário
  const signup = useCallback((name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (users[email]) {
      return { success: false, error: "Email já cadastrado" };
    }

    users[email] = { name, password };
    localStorage.setItem("users", JSON.stringify(users));
    
    // Inicializar novo usuário com 0 XP
    setIsAuthenticated(true);
    setUserName(name);
    setUserEmail(email);
    setXp(0);
    setLevel(1);
    setXpMax(100);
    setCoins(0);
    setCompletedCourses([]);

    return { success: true };
  }, []);

  // Login - validar usuário
  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (!users[email]) {
      return { success: false, error: "Email ou senha incorretos" };
    }

    if (users[email].password !== password) {
      return { success: false, error: "Email ou senha incorretos" };
    }

    setIsAuthenticated(true);
    setUserName(users[email].name);
    setUserEmail(email);

    return { success: true };
  }, []);

  const value = {
    isAuthenticated,
    userName,
    userEmail,
    xp,
    level,
    xpMax,
    coins,
    search,
    setSearch,
    completedCourses,
    levelPulse,
    coinAnim,
    signup,
    login,
    addXP,
    addCoins,
    completeCourse,
    isCourseCompleted,
    resetProgress,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser usado dentro de GameProvider");
  }
  return context;
}