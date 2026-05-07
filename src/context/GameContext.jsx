import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { updateUserStreak } from "../services/streakService";

const GameContext = createContext();

function normalizeCourseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    // Formato Postgres array string: {"a","b"} ou {a,b}
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const inner = trimmed.slice(1, -1).trim();
      if (!inner) return [];

      return inner
        .split(",")
        .map((item) => item.replace(/^"(.*)"$/, "$1").trim())
        .filter(Boolean);
    }

    // Fallback: CSV simples
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function GameProvider({ children }) {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpMax, setXpMax] = useState(100);
  const [search, setSearch] = useState("");
  const [completedCourses, setCompletedCourses] = useState([]);
  const [startedCourses, setStartedCourses] = useState([]);
  const [streakDays, setStreakDays] = useState(0);

  const [levelPulse, setLevelPulse] = useState(false);
  const [coinAnim, setCoinAnim] = useState(false);

  const loadProfile = useCallback(async (user) => {
    if (!user) return;

    setUserId(user.id);
    setUserEmail(user.email);
    setIsAuthenticated(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Erro ao carregar perfil:", error.message);
      return;
    }

    if (data) {
      setUserName(data.name || "");
      setXp(data.xp || 0);
      setCoins(data.coins || 0);
      setLevel(data.level || 1);
      setXpMax(data.xp_max || 100);
      setStreakDays(data.streak_days || 0);
      setCompletedCourses(
        normalizeCourseList(data.completed_courses)
      );
      setStartedCourses(
        normalizeCourseList(data.started_courses)
      );

      // Atualizar streak quando o usuário já está logado (retorno à aplicação)
      await updateUserStreak(user.id);
    }

    const { data: progressData, error: progressError } = await supabase
      .from("user_course_progress")
      .select("course_id, started_at, completed_at")
      .eq("user_id", user.id);

    if (progressError) {
      console.error("Erro ao carregar progresso por curso:", progressError.message);
      return;
    }

    if (progressData) {
      const startedFromProgress = [
        ...new Set(progressData.map((item) => item.course_id).filter(Boolean)),
      ];
      const completedFromProgress = [
        ...new Set(
          progressData
            .filter((item) => Boolean(item.completed_at))
            .map((item) => item.course_id)
            .filter(Boolean)
        ),
      ];

      setStartedCourses(startedFromProgress);
      setCompletedCourses(completedFromProgress);
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Erro ao verificar sessão:", error.message);
      } else if (data.session?.user) {
        await loadProfile(data.session.user);
      }

      setIsAuthLoading(false);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthLoading(false);

      if (session?.user) {
        loadProfile(session.user);
      } else {
        setIsAuthenticated(false);
        setUserId("");
        setUserName("");
        setUserEmail("");
        setXp(0);
        setCoins(0);
        setLevel(1);
        setXpMax(100);
        setCompletedCourses([]);
        setStartedCourses([]);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const saveProfile = useCallback(async (newData) => {
    if (!userId) return;

    const { error } = await supabase
      .from("profiles")
      .update(newData)
      .eq("id", userId);

    if (error) {
      console.error("Erro ao salvar perfil:", error.message);
    }
  }, [userId]);

  const signup = useCallback(async (name, email, password) => {
    if (!isSupabaseConfigured) {
      console.error("Signup blocked: Supabase config is missing or invalid.");
      return {
        success: false,
        error:
          "Supabase não está configurado corretamente. Verifique .env e reinicie o servidor.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message || "Falha ao criar conta" };
      }

      if (data?.user) {
        await loadProfile(data.user);
      }

      return { success: true };
    } catch (err) {
      console.error("Signup error:", err);
      return {
        success: false,
        error:
          err?.message ||
          "Não foi possível criar conta. Verifique a conexão ou configuração do Supabase.",
      };
    }
  }, [loadProfile]);

  const login = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      console.error("Login blocked: Supabase config is missing or invalid.");
      return {
        success: false,
        error:
          "Supabase não está configurado corretamente. Verifique .env e reinicie o servidor.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: "Email ou senha incorretos" };
      }

      if (data?.user) {
        await loadProfile(data.user);
        // Atualizar streak após login bem-sucedido
        await updateUserStreak(data.user.id);
      }

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        error:
          err?.message ||
          "Não foi possível entrar. Verifique a conexão ou configuração do Supabase.",
      };
    }
  }, [loadProfile]);

  const resetProgress = useCallback(async () => {
    await supabase.auth.signOut();

    setIsAuthenticated(false);
    setUserId("");
    setUserName("");
    setUserEmail("");
    setXp(0);
    setLevel(1);
    setXpMax(100);
    setCoins(0);
    setCompletedCourses([]);
    setStartedCourses([]);
    setSearch("");
    setStreakDays(0);
  }, []);

  const addXP = useCallback(async (amount) => {
    let newXp = xp + amount;
    let newLevel = level;
    let newXpMax = xpMax;

    while (newXp >= newXpMax) {
      newXp -= newXpMax;
      newLevel += 1;
      newXpMax = Math.floor(newXpMax * 1.3);

      setLevelPulse(true);
      setTimeout(() => setLevelPulse(false), 3000);
    }

    setXp(newXp);
    setLevel(newLevel);
    setXpMax(newXpMax);

    await saveProfile({
      xp: newXp,
      level: newLevel,
      xp_max: newXpMax,
    });
  }, [xp, level, xpMax, saveProfile]);

  const addCoins = useCallback(async (amount) => {
    const newCoins = coins + amount;

    setCoinAnim(true);
    setTimeout(() => setCoinAnim(false), 1500);

    setCoins(newCoins);

    await saveProfile({
      coins: newCoins,
    });
  }, [coins, saveProfile]);

  const startCourse = useCallback(async (courseId) => {
    if (!userId || !courseId) return;

    const startedAt = new Date().toISOString();

    const { error } = await supabase
      .from("user_course_progress")
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          started_at: startedAt,
        },
        {
          onConflict: "user_id,course_id",
          ignoreDuplicates: false,
        }
      );

    if (error) {
      console.error("Erro ao iniciar curso:", error.message);
      return;
    }

    setStartedCourses((prev) => {
      if (prev.includes(courseId)) return prev;
      const updated = [...prev, courseId];
      saveProfile({ started_courses: updated });
      return updated;
    });
  }, [userId, saveProfile]);

  const completeCourse = useCallback(async (courseId) => {
    if (!userId || !courseId) return;

    const nowIso = new Date().toISOString();

    const { error } = await supabase
      .from("user_course_progress")
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          started_at: nowIso,
          completed_at: nowIso,
          status: "completed",
        },
        {
          onConflict: "user_id,course_id",
          ignoreDuplicates: false,
        }
      );

    if (error) {
      console.error("Erro ao concluir curso:", error.message);
      return;
    }

    setStartedCourses((prev) => {
      if (prev.includes(courseId)) return prev;
      const updated = [...prev, courseId];
      saveProfile({ started_courses: updated });
      return updated;
    });

    setCompletedCourses((prev) => {
      if (prev.includes(courseId)) return prev;
      const updated = [...prev, courseId];
      saveProfile({ completed_courses: updated });
      return updated;
    });
  }, [userId, saveProfile]);

  const isCourseCompleted = useCallback((courseId) => {
    return completedCourses.includes(courseId);
  }, [completedCourses]);

  const isCourseStarted = useCallback((courseId) => {
    return startedCourses.includes(courseId);
  }, [startedCourses]);

  const value = {
    isAuthLoading,
    isAuthenticated,
    userId,
    userName,
    userEmail,
    xp,
    level,
    xpMax,
    coins,
    search,
    setSearch,
    completedCourses,
    startedCourses,
    levelPulse,
    coinAnim,
    streakDays,
    signup,
    login,
    addXP,
    addCoins,
    startCourse,
    completeCourse,
    isCourseStarted,
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
