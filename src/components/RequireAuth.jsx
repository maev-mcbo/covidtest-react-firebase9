import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Login from "../routes/Login";

const requireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log("log desde requiereauth "+user)

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default requireAuth;
