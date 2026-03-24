import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  type = "button",
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-2xl bg-blue-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-blue-700 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}