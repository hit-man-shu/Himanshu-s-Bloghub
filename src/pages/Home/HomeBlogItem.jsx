import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

const HomeBlogItem = ({ blog }) => {
  const token = useRouteLoaderData("root");

  const formattedDate = new Date(blog.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-500 hover:scale-105">
      <img
        src={blog.image}
        alt="Blog Post 1"
        className="w-full object-cover md:h-64"
      />
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          {blog.title}
        </h3>
        <p className="text-gray-600">{blog.description}</p>

        <div className="flex items-center justify-between py-4">
          <Link
            to={!token ? "/login" : `/blogs/${blog.id}`}
            className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Read More
          </Link>
          <div className="felx flex-col items-center">
            <p>{blog.author}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlogItem;
