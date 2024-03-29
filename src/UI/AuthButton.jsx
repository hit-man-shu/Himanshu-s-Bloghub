import React from "react";

const AuthButton = ({ children, className, ...props }) => {
  return (
    <button
      type="submit"
      className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 active:outline-none active:ring-2 active:ring-indigo-500 active:ring-offset-2 ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default AuthButton;
