import { api } from "./api";
import type { ClassItem } from "../types/class";

interface EnrollmentItem {
  _id: string;
  userId: string;
  classId: ClassItem;
  createdAt: string;
  updatedAt: string;
}

export async function getMyEnrollmentClassIds(token: string) {
  const response = await api.get<EnrollmentItem[]>("/enrollments/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data
    .map((item) => item.classId?._id)
    .filter((id): id is string => Boolean(id));
}

export async function enrollInClassRequest(token: string, classId: string) {
  await api.post(
    "/enrollments",
    { classId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function cancelEnrollmentRequest(token: string, classId: string) {
  await api.delete(`/enrollments/${classId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}