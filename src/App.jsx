import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home/Home";
import { queryClient } from "./utils/http";
import ErrorPage from "./pages/ErrorPage";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import NewBlog from "./pages/NewBlog/NewBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import About from "./pages/About";
import Blogs from "./pages/Blogs/Blogs";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./utils/auth";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // errorElement: <ErrorPage />,
      id: "root",
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "blogs",
          children: [
            {
              index: true,
              element: <Blogs />,
            },
            {
              path: ":id",
              children: [
                {
                  index: true,
                  element: <BlogDetails />,
                  loader: checkAuthLoader,
                },
                {
                  path: "edit",
                  element: <EditBlog />,
                  loader: checkAuthLoader,
                },
              ],
            },

            {
              path: "new",
              element: <NewBlog />,
            },
          ],
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "signup",
          element: <Signup />,
          action: signupAction,
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <ToastContainer />
      </RouterProvider>
    </QueryClientProvider>
  );
};

export default App;
