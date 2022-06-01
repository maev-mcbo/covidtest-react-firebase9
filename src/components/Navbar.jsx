import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { UserContext } from "../context/UserProvider";

function Navbar() {
  const { user, logoutUser } = useContext(UserContext);
  const togglemenu = () => {
    const el = document.getElementById("menu");
    el.classList.toggle("hidden");
  };

  return (
    <header>
      <nav
        className="
        container
    flex flex-wrap
    items-center
    justify-between
    w-full
    py-4
    md:py-0
    px-4
    text-lg text-gray-700
    bg-white
  "
      >
        <div className="">
          <a href="/">
            <img src={logo} alt="logo" className="mr-3 h-6 sm:h-9" />
          </a>
        </div>
        <svg
          onClick={() => {
            togglemenu();
          }}
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium0">
            <li>
              <NavLink
                to="/dashboard"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                href="#"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/branches"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                href="#"
              >
                Sucursales
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                href="#"
              >
                Ordenes
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    href="#"
                  >
                    Profile
                  </NavLink>
                </li>

                <a
                  onClick={() => {
                    logoutUser();
                  }}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  href="#"
                >
                  Cerrar Sesion
                </a>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    href="#"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    href="#"
                  >
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
