import React from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const Header = () => {
  const token = useRouteLoaderData("root");

  return (
    <header>
      <nav className="container mx-auto flex h-20 w-full items-center rounded-b-md border-b-2 border-gray-800  bg-gradient-to-r from-blue-500 to-blue-800 px-4 md:px-6">
        <NavLink
          className="mr-4 text-2xl font-bold  text-white md:text-3xl"
          to="/"
        >
          Himanshu's Blog
        </NavLink>
        <nav className="hidden flex-1 justify-center md:flex">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mx-1.5 rounded text-lg font-bold  text-stone-300 transition-colors duration-300 md:text-base"
                : "mx-1.5 rounded text-lg  font-bold text-white transition-colors duration-300 hover:text-stone-300 md:text-base"
            }
            data-active
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mx-1.5 rounded text-lg  text-stone-300 transition-colors duration-300 md:text-base"
                : "mx-1.5 rounded text-lg  font-bold text-white transition-colors duration-300 hover:text-stone-300 md:text-base"
            }
            to="/blogs"
          >
            Blogs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "mx-1.5 rounded text-lg  text-stone-300 transition-colors duration-300 md:text-base"
                : "mx-1.5 rounded text-lg  font-bold text-white transition-colors duration-300 hover:text-stone-300 md:text-base"
            }
            to="/about"
          >
            About
          </NavLink>
        </nav>

        <ul className="ml-auto flex items-center space-x-4">
          {!token ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "mx-1.5 rounded text-lg  text-stone-300 transition-colors duration-300 md:text-base"
                      : "mx-1.5 rounded text-lg  font-bold text-white transition-colors duration-300 hover:text-stone-300 md:text-base"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "mx-1.5 rounded text-lg  text-stone-300 transition-colors duration-300 md:text-base"
                      : "mx-1.5 rounded text-lg  font-bold text-white transition-colors duration-300 hover:text-stone-300 md:text-base"
                  }
                  to="/signup"
                >
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <Form action="/logout" method="post">
                <button className="rounded-md bg-blue-500 px-4 py-1 font-bold text-white duration-200 hover:bg-white hover:text-blue-800">
                  Logout
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
