import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

const BlogsHeader = () => {
  const token = useRouteLoaderData("root");

  return (
    <div className="flex flex-col items-center justify-center rounded-t-md bg-gradient-to-r from-blue-500 to-blue-800 px-20 py-12 md:flex-row md:items-start md:justify-between">
      <div className="max-w-2xl text-center md:mr-8 md:text-left">
        <h2 className="text-3xl font-bold text-white md:text-5xl md:leading-tight">
          Read Our Tech Insights
        </h2>
        <p className="mt-4 text-lg text-white">
          Stay updated with the latest in technology, innovation, and digital
          trends. Dive into our insightful articles and enhance your tech
          knowledge.
        </p>
      </div>
      <div className="mt-6 flex items-center justify-center md:justify-end">
        <Link
          to={!token ? "/login" : "/blogs/new"}
          className="inline-block rounded-full bg-green-500 px-8 py-3 font-bold text-white transition duration-300 hover:bg-green-600"
        >
          Create Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogsHeader;
