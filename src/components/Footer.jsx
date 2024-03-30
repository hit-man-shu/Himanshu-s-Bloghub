import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container mx-auto mt-4 rounded-t-md border-t border-t-stone-900 bg-blue-600">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="mb-4 flex items-center space-x-3 rtl:space-x-reverse sm:mb-0">
            <div className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
              <Link to="/">Himanshu's Blog</Link>
            </div>
          </span>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-bold text-white sm:mb-0">
            <li>
              <Link to="/about" className="me-4 hover:underline md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="me-4 hover:underline md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="me-4 hover:underline md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-200 dark:text-gray-200 sm:text-center">
          © 2024{" "}
          <Link to="/about" className="hover:underline">
            Himanshu
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
