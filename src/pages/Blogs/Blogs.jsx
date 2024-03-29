import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../utils/http";
import BlogsItem from "./BlogsItem";
import BlogsHeader from "./BlogsHeader";
import Loader from "../../UI/Loader";

const Blogs = () => {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: ({ signal }) => getBlogs({ signal }),
    staleTime: 3000,
  });

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <div className="text-center text-rose-900">
        <h1 className="text-2xl font-bold">Failed to load blog!</h1>
        <p>{error.message || "Unable to fetch data"}</p>
      </div>
    );
  }

  if (data) {
    content = (
      <div className="container mx-auto grid max-w-6xl grid-cols-1 justify-center gap-6 p-6  sm:grid-cols-2 lg:grid-cols-3">
        {data.map((blog) => {
          return <BlogsItem key={blog.id} blog={blog} />;
        })}
      </div>
    );
  }
  return (
    <section className="container mx-auto my-10 rounded-md dark:bg-gray-100 dark:text-gray-800">
      <div className=" sm:space-y-12">
        <BlogsHeader />
        {content}
      </div>
    </section>
  );
};

export default Blogs;
