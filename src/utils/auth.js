import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};

export const tokenLoader = () => {
  const token = getAuthToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    return { token, username };
  } else {
    return null;
  }
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  } else {
    return null;
  }
};
