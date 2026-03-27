export type UserRole = "Aprendiz" | "Voluntário";

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  neighborhood: string;
  phone: string;
  role: UserRole;
  interest: string;
  about: string;
}