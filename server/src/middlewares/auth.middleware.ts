import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

interface AuthTokenPayload {
  userId: string;
}

export function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: "Token não informado.",
      });
    }

    const [, token] = authHeader.split(" ");

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET não foi definida no arquivo .env");
    }

    const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;

    request.userId = decoded.userId;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}