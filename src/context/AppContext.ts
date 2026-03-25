import { createContext } from "react";
import type { User } from "../types/user";

export interface AppContextData {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  enrolledClassIds: string[];
  registerUser: (user: User) => void;
  loginUser: (email: string, password: string) => boolean;
  enrollInClass: (classId: string) => void;
  clearSession: () => void;
  getEnrolledUsersByClass: (classId: string) => User[];
  cancelEnrollment: (classId: string) => void;
}

export const AppContext = createContext<AppContextData | undefined>(undefined);