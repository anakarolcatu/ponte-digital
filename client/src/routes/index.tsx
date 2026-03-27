import { Route, Routes } from "react-router-dom";
import ClassesPage from "../pages/Classes";
import DashboardPage from "../pages/Dashboard";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import MyClassesPage from "../pages/MyClasses";
import ClassDetailsPage from "../pages/ClassDetails";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/aulas" element={<ClassesPage />} />
      <Route path="/aulas/:id" element={<ClassDetailsPage />} />
      <Route path="/minhas-aulas" element={<MyClassesPage />} />
    </Routes>
  );
}