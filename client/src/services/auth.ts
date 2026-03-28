import { api } from "./api";
import type { User } from "../types/user";

export async function getAuthenticatedUser(token: string) {
  const response = await api.get<User>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}