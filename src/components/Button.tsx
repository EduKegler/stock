import { memo, ButtonHTMLAttributes, useMemo } from "react";

type ButtonVariant = "primary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = useMemo(
    () =>
      "flex-1 rounded-md cursor-pointer px-4 py-2 text-white disabled:opacity-50",
    []
  );

  const variantStyles = useMemo(
    () => ({
      primary: "bg-primary hover:bg-green-600",
      danger: "bg-red-500 hover:bg-red-600",
    }),
    []
  );

  return (
    <button
      role="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export default memo(Button);
