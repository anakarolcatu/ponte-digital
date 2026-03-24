import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/user";

interface AppContextData {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  enrolledClassIds: string[];
  registerUser: (user: User) => void;
  loginUser: (email: string) => boolean;
  enrollInClass: (classId: string) => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

const STORAGE_KEYS = {
  users: "ponte-digital:users",
  currentUser: "ponte-digital:currentUser",
  enrolledClassIds: "ponte-digital:enrolledClassIds",
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

function getStoredUsers(): User[] {
  const stored = localStorage.getItem(STORAGE_KEYS.users);
  if (!stored) return mockUsers;

  try {
    return JSON.parse(stored) as User[];
  } catch {
    return mockUsers;
  }
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

function getStoredEnrolledClassIds(): string[] {
  const stored = localStorage.getItem(STORAGE_KEYS.enrolledClassIds);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: AppProviderProps) {
  const [users, setUsers] = useState<User[]>(() => getStoredUsers());
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getStoredCurrentUser(),
  );
  const [enrolledClassIds, setEnrolledClassIds] = useState<string[]>(() =>
    getStoredEnrolledClassIds(),
  );

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

      setEnrolledClassIds((prev) => {
        if (prev.includes(classId)) return prev;
        return [...prev, classId];
      });
    },
    [currentUser],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.enrolledClassIds,
      JSON.stringify(enrolledClassIds),
    );
  }, [enrolledClassIds]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      enrolledClassIds,
      registerUser,
      loginUser,
      enrollInClass,
    }),
    [currentUser, enrolledClassIds, registerUser, loginUser, enrollInClass],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de AppProvider");
  }

  return context;
}
