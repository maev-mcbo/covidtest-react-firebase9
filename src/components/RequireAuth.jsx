import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Login from "../routes/Login";

const requireAuth = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={<Login />} />;
  }

  return children;
};

export default requireAuth;
