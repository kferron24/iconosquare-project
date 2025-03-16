import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:bg-blue-600"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
