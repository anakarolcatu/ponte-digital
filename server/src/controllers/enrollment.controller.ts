import type { Request, Response } from "express";
import mongoose from "mongoose";
import { ClassModel } from "../models/class.model.js";
import { EnrollmentModel } from "../models/enrollment.model.js";
import { UserModel } from "../models/user.model.js";

export async function enrollInClass(request: Request, response: Response) {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    const rawClassId = request.body.classId;

    if (typeof rawClassId !== "string") {
      return response.status(400).json({
        message: "O ID da aula é obrigatório.",
      });
    }

    const classId = rawClassId;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return response.status(400).json({
        message: "ID da aula inválido.",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    if (user.role !== "Aprendiz") {
      return response.status(403).json({
        message: "Somente aprendizes podem se inscrever em aulas.",
      });
    }

    const classItem = await ClassModel.findById(classId);

    if (!classItem) {
      return response.status(404).json({
        message: "Aula não encontrada.",
      });
    }

    const existingEnrollment = await EnrollmentModel.findOne({
      userId,
      classId,
    });

    if (existingEnrollment) {
      return response.status(409).json({
        message: "Você já está inscrito nesta aula.",
      });
    }

    const enrolledCount = await EnrollmentModel.countDocuments({ classId });

    if (enrolledCount >= classItem.spots) {
      return response.status(409).json({
        message: "Não há mais vagas disponíveis para esta aula.",
      });
    }

    const enrollment = await EnrollmentModel.create({
      userId,
      classId,
    });

    return response.status(201).json({
      message: "Inscrição realizada com sucesso.",
      enrollment,
    });
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error);

    return response.status(500).json({
      message: "Erro interno ao realizar inscrição.",
    });
  }
}

export async function cancelEnrollment(request: Request, response: Response) {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Usuário não autenticado.",
      });
    }
    const rawClassId = request.params.classId;

    if (typeof rawClassId !== "string") {
      return response.status(400).json({
        message: "ID da aula inválido.",
      });
    }

    const classId = rawClassId;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return response.status(400).json({
        message: "ID da aula inválido.",
      });
    }

    const enrollment = await EnrollmentModel.findOneAndDelete({
      userId,
      classId,
    });

    if (!enrollment) {
      return response.status(404).json({
        message: "Inscrição não encontrada.",
      });
    }

    return response.status(200).json({
      message: "Inscrição cancelada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao cancelar inscrição:", error);

    return response.status(500).json({
      message: "Erro interno ao cancelar inscrição.",
    });
  }
}

export async function getMyEnrollments(request: Request, response: Response) {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    const enrollments = await EnrollmentModel.find({ userId }).populate(
      "classId",
    );

    return response.status(200).json(enrollments);
  } catch (error) {
    console.error("Erro ao buscar inscrições do usuário:", error);

    return response.status(500).json({
      message: "Erro interno ao buscar inscrições.",
    });
  }
}

export async function getEnrolledUsersByClass(
  request: Request,
  response: Response,
) {
  try {
    const rawClassId = request.params.classId;

    if (typeof rawClassId !== "string") {
      return response.status(400).json({
        message: "ID da aula inválido.",
      });
    }

    const classId = rawClassId;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return response.status(400).json({
        message: "ID da aula inválido.",
      });
    }

    const enrollments = await EnrollmentModel.find({ classId }).populate(
      "userId",
      "-password",
    );

    const users = enrollments.map((enrollment) => enrollment.userId);

    return response.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar inscritos da aula:", error);

    return response.status(500).json({
      message: "Erro interno ao buscar inscritos da aula.",
    });
  }
}
