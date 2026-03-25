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
  users: "ponte-digital:users",
  currentUser: "ponte-digital:currentUser",
  enrollmentsByUser: "ponte-digital:enrollmentsByUser",
};

const mockUsers: User[] = [
  {
    id: "u1",
    name: "Ana Souza",
    email: "ana@email.com",
    password: "123456",
    age: 22,
    neighborhood: "Santana",
    phone: "11999999999",
    role: "Aprendiz",
    interest: "WhatsApp e currículo",
    about: "Quero aprender para conseguir novas oportunidades.",
  },
  {
    id: "u2",
    name: "Carlos Lima",
    email: "carlos@email.com",
    password: "123456",
    age: 34,
    neighborhood: "Casa Verde",
    phone: "11988888888",
    role: "Voluntário",
    interest: "Informática básica",
    about: "Quero ajudar outras pessoas com tecnologia.",
  },
];

interface AppProviderProps {
  children: ReactNode;
}

function isValidUser(user: Partial<User>): user is User {
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.password === "string" &&
    typeof user.age === "number" &&
    typeof user.neighborhood === "string" &&
    typeof user.phone === "string" &&
    (user.role === "Aprendiz" || user.role === "Voluntário") &&
    typeof user.interest === "string" &&
    typeof user.about === "string"
  );
}

function getStoredUsers(): User[] {
  const stored = localStorage.getItem(STORAGE_KEYS.users);
  if (!stored) return mockUsers;

  try {
    const parsed = JSON.parse(stored) as Partial<User>[];
    const validUsers = Array.isArray(parsed) ? parsed.filter(isValidUser) : [];

    return validUsers.length > 0 ? validUsers : mockUsers;
  } catch {
    return mockUsers;
  }
}

function getStoredCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEYS.currentUser);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<User>;
    return isValidUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
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
  const [users, setUsers] = useState<User[]>(() => getStoredUsers());
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getStoredCurrentUser(),
  );
  const [enrollmentsByUser, setEnrollmentsByUser] = useState<EnrollmentsByUser>(
    () => getStoredEnrollmentsByUser(),
  );

  const enrolledClassIds = useMemo(() => {
    if (!currentUser) return [];
    return enrollmentsByUser[currentUser.id] ?? [];
  }, [currentUser, enrollmentsByUser]);

  const registerUser = useCallback((user: User) => {
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
  }, []);

  const loginUser = useCallback(
    (email: string, password: string) => {
      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password,
      );

      if (!foundUser) return false;

      setCurrentUser(foundUser);
      return true;
    },
    [users],
  );

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
    [currentUser],
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
    [currentUser],
  );

  const clearSession = useCallback(() => {
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.enrollmentsByUser,
      JSON.stringify(enrollmentsByUser),
    );
  }, [enrollmentsByUser]);

  const getEnrolledUsersByClass = useCallback(
    (classId: string) => {
      return users.filter((user) => {
        const userEnrollments = enrollmentsByUser[user.id] ?? [];
        return userEnrollments.includes(classId);
      });
    },
    [users, enrollmentsByUser],
  );

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      enrolledClassIds,
      registerUser,
      loginUser,
      enrollInClass,
      cancelEnrollment,
      clearSession,
      getEnrolledUsersByClass,
    }),
    [
      currentUser,
      enrolledClassIds,
      registerUser,
      loginUser,
      enrollInClass,
      cancelEnrollment,
      clearSession,
      getEnrolledUsersByClass,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
