import { api } from "./api";
import type { ClassItem } from "../types/class";
import type { User } from "../types/user";

export async function getTeacherClasses(teacherId: string) {
  const response = await api.get<ClassItem[]>(`/classes/teacher/${teacherId}`);
  return response.data;
}

export async function getEnrolledUsersByClass(token: string, classId: string) {
  const response = await api.get<User[]>(`/enrollments/class/${classId}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}