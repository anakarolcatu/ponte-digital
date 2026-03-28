import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";

function generateToken(userId: string) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET não foi definida no arquivo .env");
  }

  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });
}

export async function register(request: Request, response: Response) {
  try {
    const {
      name,
      email,
      password,
      age,
      neighborhood,
      phone,
      role,
      interest,
      about,
    } = request.body;

    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !neighborhood ||
      !phone ||
      !role ||
      !interest ||
      !about
    ) {
      return response.status(400).json({
        message: "Todos os campos são obrigatórios.",
      });
    }

    const existingUser = await UserModel.findOne({
      email: String(email).toLowerCase(),
    });

    if (existingUser) {
      return response.status(409).json({
        message: "Já existe um usuário com este e-mail.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      age,
      neighborhood,
      phone,
      role,
      interest,
      about,
    });

    const token = generateToken(user._id.toString());

    return response.status(201).json({
      message: "Cadastro realizado com sucesso.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        neighborhood: user.neighborhood,
        phone: user.phone,
        role: user.role,
        interest: user.interest,
        about: user.about,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return response.status(500).json({
      message: "Erro interno ao cadastrar usuário.",
    });
  }
}

export async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "E-mail e senha são obrigatórios.",
      });
    }

    const user = await UserModel.findOne({
      email: String(email).toLowerCase(),
    });

    if (!user) {
      return response.status(401).json({
        message: "Credenciais inválidas.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({
        message: "Credenciais inválidas.",
      });
    }

    const token = generateToken(user._id.toString());

    return response.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        neighborhood: user.neighborhood,
        phone: user.phone,
        role: user.role,
        interest: user.interest,
        about: user.about,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    return response.status(500).json({
      message: "Erro interno ao fazer login.",
    });
  }
}

export async function me(request: Request, response: Response) {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return response.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    return response.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      neighborhood: user.neighborhood,
      phone: user.phone,
      role: user.role,
      interest: user.interest,
      about: user.about,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário autenticado:", error);

    return response.status(500).json({
      message: "Erro interno ao buscar usuário autenticado.",
    });
  }
}