import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-b-8 border-t-8 border-gray-200"></div>
        <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-b-8 border-t-8 border-blue-500"></div>
      </div>
    </div>
  );
};

export default Loader;
