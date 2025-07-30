import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { type = "text", label, className = "", inputError, ...props },
  ref
) {
  let id = useId();
  return (
    <div className="w-full relative mb-3">
      {label && (
        <label htmlFor={id} className="block mb-1 dark:text-white font-medium text-base">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`${className} p-2 w-full outline-none text-white placeholder:text-light-text border-accent dark:border-slate-700 border rounded-md`}
        ref={ref}
        {...props}
      />
      {inputError && <p className=" absolute -bottom-6 left-0 text-sm text-red-600">*{inputError}</p>}
    </div>
  );
});

export default Input;
