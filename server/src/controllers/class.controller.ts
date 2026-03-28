import type { Request, Response } from "express";
import { ClassModel } from "../models/class.model.js";

export async function getAllClasses(_request: Request, response: Response) {
  try {
    const classes = await ClassModel.find().sort({ createdAt: -1 });

    return response.status(200).json(classes);
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);

    return response.status(500).json({
      message: "Erro interno ao buscar aulas.",
    });
  }
}

export async function getClassById(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const classItem = await ClassModel.findById(id);

    if (!classItem) {
      return response.status(404).json({
        message: "Aula não encontrada.",
      });
    }

    return response.status(200).json(classItem);
  } catch (error) {
    console.error("Erro ao buscar detalhes da aula:", error);

    return response.status(500).json({
      message: "Erro interno ao buscar detalhes da aula.",
    });
  }
}

export async function getTeacherClasses(request: Request, response: Response) {
  try {
    const { teacherId } = request.params;

    const classes = await ClassModel.find({ teacherId }).sort({ createdAt: -1 });

    return response.status(200).json(classes);
  } catch (error) {
    console.error("Erro ao buscar aulas do voluntário:", error);

    return response.status(500).json({
      message: "Erro interno ao buscar aulas do voluntário.",
    });
  }
}