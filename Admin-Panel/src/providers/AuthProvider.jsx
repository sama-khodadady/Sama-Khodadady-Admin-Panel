import { Navigate } from "react-router-dom";

import { getCookie } from "utils/cookie";

function AuthProvider({ children }) {
  const token = getCookie("token");
  if (!token) return <Navigate to="/signup" />;
  return children;
}

export default AuthProvider;
