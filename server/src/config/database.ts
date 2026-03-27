import mongoose from "mongoose";

export async function connectDatabase(mongoUri: string) {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB conectado com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    throw error;
  }
}