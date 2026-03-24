export type ClassLevel = "Básico" | "Intermediário";

export interface ClassItem {
  id: string;
  title: string;
  description: string;
  category: string;
  level: ClassLevel;
  date: string;
  time: string;
  teacher: string;
  spots: number;
}