import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AppContext } from "./AppContext";
import type { User } from "../types/user";

type EnrollmentsByUser = Record<string, string[]>;

const STORAGE_KEYS = {
  currentUser: "ponte-digital:currentUser",
  token: "ponte-digital:token",
  enrollmentsByUser: "ponte-digital:enrollmentsByUser",
};

interface AppProviderProps {
  children: ReactNode;
}

function getStoredCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEYS.currentUser);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.token);
}

function getStoredEnrollmentsByUser(): EnrollmentsByUser {
  const stored = localStorage.getItem(STORAGE_KEYS.enrollmentsByUser);
  if (!stored) return {};

  try {
    const parsed = JSON.parse(stored) as EnrollmentsByUser;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getStoredCurrentUser()
  );
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [enrollmentsByUser, setEnrollmentsByUser] = useState<EnrollmentsByUser>(
    () => getStoredEnrollmentsByUser()
  );

  const enrolledClassIds = useMemo(() => {
    if (!currentUser) return [];
    return enrollmentsByUser[currentUser.id] ?? [];
  }, [currentUser, enrollmentsByUser]);

  const enrollInClass = useCallback(
    (classId: string) => {
      if (!currentUser) return;

      setEnrollmentsByUser((prev) => {
        const currentEnrollments = prev[currentUser.id] ?? [];

        if (currentEnrollments.includes(classId)) {
          return prev;
        }

        return {
          ...prev,
          [currentUser.id]: [...currentEnrollments, classId],
        };
      });
    },
    [currentUser]
  );

  const cancelEnrollment = useCallback(
    (classId: string) => {
      if (!currentUser) return;

      setEnrollmentsByUser((prev) => {
        const currentEnrollments = prev[currentUser.id] ?? [];

        return {
          ...prev,
          [currentUser.id]: currentEnrollments.filter((id) => id !== classId),
        };
      });
    },
    [currentUser]
  );

  const getEnrolledUsersByClass = useCallback((_classId: string) => {
    return [];
  }, []);

  const clearSession = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.token);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.enrollmentsByUser,
      JSON.stringify(enrollmentsByUser)
    );
  }, [enrollmentsByUser]);

  const value = useMemo(
    () => ({
      currentUser,
      token,
      setCurrentUser,
      setToken,
      clearSession,
      enrolledClassIds,
      enrollInClass,
      cancelEnrollment,
      getEnrolledUsersByClass,
    }),
    [
      currentUser,
      token,
      clearSession,
      enrolledClassIds,
      enrollInClass,
      cancelEnrollment,
      getEnrolledUsersByClass,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}