interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export function TextAreaField({
  id,
  label,
  placeholder,
  rows = 5,
  value,
  onChange,
}: TextAreaFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}