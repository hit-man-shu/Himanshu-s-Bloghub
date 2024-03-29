import React from "react";
import {
  Form,
  useActionData,
  Link,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";
import Input from "../UI/Input";
import AuthButton from "../UI/AuthButton";

const Signup = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container mx-auto my-10 flex min-h-[65vh] items-center justify-center rounded-md bg-blue-50 py-20">
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-900">
            Create a new account
          </h2>
        </div>
        <div className="bg-white px-4 py-8  sm:rounded-lg sm:px-10">
          <Form method="POST">
            <Input
              label="User Name"
              id="username"
              type="text"
              placeholder="Enter your username"
            />
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="your@email.com"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
            />

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm leading-5">
                <Link
                  to="/login"
                  className="font-medium text-blue-500 transition duration-150 ease-in-out hover:text-blue-500 focus:underline focus:outline-none"
                >
                  Already have an account?
                </Link>
              </div>
            </div>

            <div className="my-3 text-red-700">
              {data && data.error && <p>{data.error}</p>}
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <AuthButton disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Sign up"}
                </AuthButton>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

export const action = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  return redirect("/login");
};
