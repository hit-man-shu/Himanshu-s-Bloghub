import React from "react";
import { getBlogs } from "../../utils/http";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomeBlogItem from "./HomeBlogItem";
import Loader from "../../UI/Loader";

const Home = () => {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: ({ signal }) => getBlogs({ signal }),
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
      <div className="grid min-h-full grid-cols-1 gap-8 p-7 md:grid-cols-2 lg:grid-cols-3">
        {data.slice(-3).map((blog) => {
          return <HomeBlogItem key={blog.id} blog={blog} />;
        })}
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto mt-10 overflow-hidden rounded-t-md bg-white bg-gradient-to-r from-blue-500 to-blue-800 py-20 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-3xl lg:text-5xl">
            Welcome to Himanshu's Blog
          </h1>
          <p className="mx-4 mb-8 text-lg sm:mx-12 sm:text-xl md:mx-24 lg:mx-48 xl:mx-64">
            Your ultimate destination for everything technology-related. Dive
            into a world of innovation, discovery, and insight as we explore the
            latest trends, developments, and breakthroughs in the ever-changing
            world of technology.
          </p>
          <Link
            to="/blogs"
            className="inline-block rounded-full bg-white px-8 py-3 font-bold text-blue-500 transition duration-300 hover:bg-blue-200"
          >
            Explore Blogs
          </Link>
        </div>
      </section>

      <section className="container mx-auto rounded-b-md bg-white py-20">
        <div className="container mx-auto min-h-[60vh] ">
          <h2 className="mb-12 text-center text-3xl font-semibold text-gray-800">
            Latest Articles
          </h2>
          {content}
        </div>
      </section>
    </>
  );
};

export default Home;
