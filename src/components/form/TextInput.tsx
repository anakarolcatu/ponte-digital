interface TextInputProps {
  id: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  value?: string | number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export function TextInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      ) : null}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}