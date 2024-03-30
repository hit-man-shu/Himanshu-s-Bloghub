import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto my-10 min-h-[65vh] rounded-md bg-white px-4 py-16">
      <h1 className="mb-8 text-center text-4xl font-bold">
        About Himanshu's Blog
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://www.electric.ai/wp-content/uploads/BLOG-The-Top-IT-Blogs-You-Need-To-Know.png"
            alt="Himanshu"
            className="mx-auto h-64 w-64 rounded-full object-cover"
          />
          <p className="mt-4 text-center text-xl font-semibold">
            Himanshu Sahoo
          </p>
          <p className="text-center text-gray-700">
            Creator of Himanshu's Blog
          </p>
        </div>
        <div>
          <p className="mb-4 text-lg leading-loose">
            Hi there! I'm Himanshu, a passionate web developer with a strong
            interest in building user interfaces, creating interactive
            experiences, etc. I'm always eager to learn new things and push
            myself to become a better developer.
          </p>
          <p className="mb-4 text-lg leading-loose">
            This blog, Himanshu's Blog, is my platform to share my knowledge,
            experiences, and insights on web development and related topics. I
            hope to create a valuable resource for anyone interested in learning
            or expanding their web development skills.
          </p>
          <p className="text-lg leading-loose">
            I'm always open to feedback and suggestions, so feel free to reach
            out to me via{" "}
            <Link
              className="hover:text-blue-900"
              to="mailto:himanshusahoo2019@gmail.com"
            >
              email-: himanshusahoo2019@gmail.com
            </Link>
            .{" "}
            <Link
              className="hover:text-blue-900"
              to="https://github.com/hit-man-shu/hit-man-shu"
            >
              github -: github.com/hit-man-shu
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
