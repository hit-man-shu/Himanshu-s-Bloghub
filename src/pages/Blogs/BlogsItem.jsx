import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

const BlogsItem = ({ blog }) => {
  const token = useRouteLoaderData("root");

  const formatteDate = new Date(blog.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-md shadow-xl">
      <Link
        rel="noopener noreferrer"
        to={!token ? "/login" : `/blogs/${blog.id}`}
        className="group mx-auto max-w-sm hover:no-underline focus:no-underline dark:bg-gray-50"
      >
        <img
          role="presentation"
          className="h-44 w-full rounded object-cover dark:bg-gray-500"
          alt=""
          src={blog.image}
        />
        <div className="space-y-2 p-6">
          <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
            {blog.title}
          </h3>
          <div className="flex justify-between py-2">
            <span className="text-sm dark:text-gray-600">{formatteDate}</span>
            <div className=" text-sm dark:text-gray-600">{blog.author}</div>
          </div>
          <p>{blog.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogsItem;
