import { createContext } from "react";
import type { User } from "../types/user";

export interface AppContextData {
  currentUser: User | null;
  token: string | null;
  setCurrentUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearSession: () => void;
  enrolledClassIds: string[];
  enrollInClass: (classId: string) => void;
  cancelEnrollment: (classId: string) => void;
  getEnrolledUsersByClass: (classId: string) => User[];
}

export const AppContext = createContext<AppContextData | undefined>(undefined);