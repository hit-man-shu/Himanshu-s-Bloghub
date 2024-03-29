import React from "react";

const ErrorBlock = ({ title, message }) => {
  return (
    <div className="my-4 rounded-md bg-rose-200 p-4 text-rose-900">
      <h1 className="text-xl font-bold">{title}</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorBlock;
