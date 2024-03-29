import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { getTokenDuration } from "../utils/auth";

const RootLayout = () => {
  const token = useLoaderData();
  console.log(token);
  const submit = useSubmit();

  console.log(token);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <div className="min-h-screen bg-stone-950">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
