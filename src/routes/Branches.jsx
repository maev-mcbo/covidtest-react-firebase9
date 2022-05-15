import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/button";
import H1Compontent from "../components/H1Compontent";
import SpinnerLoader from "../components/SpinnerLoader";
import { useDB } from "../hooks/useDB";

function Branches() {
  const { dataBranches, error, loading, getBranch } = useDB();
  useEffect(() => {
    getBranch();
  }, []);

  if (loading) return <SpinnerLoader />;
  if (error) return <H1Compontent text="Error...." />;

  return (
    <>
      <H1Compontent text="Lista de sucrusales" />
      {dataBranches.map((item) => (
        <ul>
          <li key={item.uid}>
           
            <p>Nombre: {item.suc} </p>
            <p>Direccion: {item.sucAddress}</p>
            <p>Creada por: {item.uid}</p>
          </li>
        </ul>
      ))}
      <NavLink to="/branches/add">
        <Button type="button" text="Agregar Sucursal" />
      </NavLink>
    </>
  );
}

export default Branches;
