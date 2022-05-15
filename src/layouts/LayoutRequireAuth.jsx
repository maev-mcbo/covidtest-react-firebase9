import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const LayoutRequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log("log desde requiereauth "+user)

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto">
        <Outlet />
    </div>
  )
};

export default LayoutRequireAuth;
