import React, { useEffect } from "react";
import { Outlet, useSubmit } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { getAuthToken, getTokenDuration } from "../utils/auth";

const RootLayout = () => {
  const token = getAuthToken();
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
  }, [submit, token]);

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
