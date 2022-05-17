import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/buttons/Button";
import H1Compontent from "../components/titles/H1Compontent";
import SpinnerLoader from "../components/SpinnerLoader";
import { useDB } from "../hooks/useDB";

function Branches() {
  const { data, error, loading, getBranch } = useDB();
  useEffect(() => {
    getBranch();
  }, []);

  if (loading.getBranchLoading) return <SpinnerLoader />;
  if (error) return <H1Compontent text="Error...." />;

  return (
    <>
      <H1Compontent text="Lista de sucrusales"/>
     <br/>
    <div className=" w-1/2 mx-auto">
      {data.map((item) => (
             <div className=" p-6 mb-5 max-w bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> 

       <ul>
          <li key={item.uid}>
           
            <p>Nombre: {item.suc} </p>
            <p>Direccion: {item.sucAddress}</p>
            <p>Creada por: {item.createdBy}</p>
          </li>
        </ul>
        </div>
      ))}
      </div>
      <NavLink to="/branches/add">
        <Button type="button" text="Agregar Sucursal" />
      </NavLink>
    </>
  );
}

export default Branches;
