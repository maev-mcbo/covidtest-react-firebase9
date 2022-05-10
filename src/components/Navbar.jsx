import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, signIn, signOut } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <>
          <NavLink to="/home">Inicio</NavLink>
          <button onClick={signOut}>logout</button>
        </>
      ) : (
       <>
       <NavLink to="/home">Inicio</NavLink>
        <NavLink to="/login">Login</NavLink>
        <button onClick={signIn}>login</button>
       </>
      )}
    </div>
  );
};
export default Navbar;
