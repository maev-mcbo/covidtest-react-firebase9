import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
const Home = () => {
  return (
    <>
      <section className="text-gray-600 body-font ">
        <div
          className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center"
          style={{ height: 95 + "vh" }}
        >
          <div className="lg:max-w-lg  lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0" style={{ padding: 20 + "px" }}>
            <img
              className="object-cover object-center rounded p-10"
              alt="hero"
              src={logo}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Sistema de Gestión de pruebas Covid
            </h1>
            <p className="mb-8 leading-relaxed text-left p-20">
              Este sistema de gestion para pruebas covid se esta desarrollando
              Mario Echeverria como proyecto personal. la idea de llevar a cabo
              esta webapp es aprender los conceptos y manejo de la libreria
              REACT y el backend de Firebase en su version 9.
            </p>
            <div className="flex justify-center">
              <NavLink
                to="/register"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Registrarse
              </NavLink>
              <a
                target="_blank"
                href="https://github.com/maev-mcbo/readme"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Ver en Github
              </a>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default Home;
