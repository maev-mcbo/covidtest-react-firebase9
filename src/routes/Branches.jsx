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
          <li key={item.id}>
           
            <p>Nombre: {item.suc} </p>
            <p>Direccion: {item.sucAddress}</p>
            <p>Creada por: {item.createdBy}</p>
            <p>Creada por: {item.id}</p>
            <Button text="borrar" onClick={ () => handleDeleteButton(item.id)} loading={loading[item.id]}/>

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
