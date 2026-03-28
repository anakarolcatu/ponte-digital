import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AppContext } from "./AppContext";
import type { User } from "../types/user";
import { getMyEnrollmentClassIds } from "../services/enrollment";
import { getAuthenticatedUser } from "../services/auth";

const STORAGE_KEYS = {
  currentUser: "ponte-digital:currentUser",
  token: "ponte-digital:token",
};

interface AppProviderProps {
  children: ReactNode;
}

function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [enrolledClassIds, setEnrolledClassIds] = useState<string[]>([]);

  const clearSession = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
    setEnrolledClassIds([]);
  }, []);

  useEffect(() => {
  async function restoreSession() {
    if (!token) {
      setCurrentUser(null);
      setEnrolledClassIds([]);
      return;
    }

    try {
      const user = await getAuthenticatedUser(token);
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao restaurar sessão:", error);
      setCurrentUser(null);
      setToken(null);
      setEnrolledClassIds([]);
    }
  }

  void restoreSession();
}, [token]);

  useEffect(() => {
  async function loadEnrollments() {
    if (!token) {
      setEnrolledClassIds([]);
      return;
    }

    try {
      const enrolledIds = await getMyEnrollmentClassIds(token);
      setEnrolledClassIds(enrolledIds);
    } catch (error) {
      console.error("Erro ao carregar inscrições do usuário:", error);
    }
  }

    void loadEnrollments();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.token);
    }
  }, [token]);

  const value = useMemo(
    () => ({
      currentUser,
      token,
      setCurrentUser,
      setToken,
      clearSession,
      enrolledClassIds,
      setEnrolledClassIds,
    }),
    [currentUser, token, clearSession, enrolledClassIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}