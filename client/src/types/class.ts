export type ClassLevel = "Básico" | "Intermediário";

export interface ClassItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: ClassLevel;
  date: string;
  time: string;
  teacherId: string;
  teacherName: string;
  spots: number;
  targetAudience: string;
  objective: string;
  materials: string[];
  notes: string;
}