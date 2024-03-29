import React from "react";
import {
  Form,
  Link,
  useNavigation,
  json,
  redirect,
  useActionData,
} from "react-router-dom";
import Input from "../UI/Input";
import AuthButton from "../UI/AuthButton";

const Login = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <div className="container mx-auto my-10 flex min-h-[65vh] items-center justify-center rounded-md bg-blue-50 ">
        <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md ">
          <h1 className="mb-4 text-center text-2xl font-bold ">
            Welcome Back!
          </h1>

          <Form method="post">
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

            <div className="mb-4 flex items-center justify-between">
              <Link
                to="/signup"
                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </Link>
            </div>
            <div className="my-3 text-red-700">
              {data && data.error && <p>{data.error}</p>}
            </div>
            <AuthButton disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Login"}
            </AuthButton>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const action = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    "https://himanshu-s-bloghub.onrender.com/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    },
  );

  if (response.status === 400 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  if (token) {
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    localStorage.setItem("expiration", expiration.toISOString());
  }

  return redirect("/blogs");
};
