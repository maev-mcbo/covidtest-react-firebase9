import { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);

  console.log("log nav " + user);
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <>
            <h1>estoy logeado</h1>
          <NavLink to="/"> Inicio | </NavLink>
          <NavLink to="/order"> Order | </NavLink>
          <NavLink to="/profile"> Profile | </NavLink>
          
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </>
      ) : (
        <>
         <h1>no estoy logeado</h1>
          <NavLink to="/login"> Login |</NavLink>
          <NavLink to="/register"> Register |</NavLink>
        </>
      )}
    </div>
  );
};
export default Navbar;
