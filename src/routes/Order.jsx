import React from "react";
import { NavLink } from "react-router-dom";
import { useDB } from "../hooks/useDB";
import H1Compontent from "../components/H1Compontent";
import Button from "../components/button";

const Order = () => {
  return (
    <div className="container">
      <H1Compontent text="Bandeja de ordenes" />
      *Componentes lista de ordenes *
      <NavLink to="/create">
        <Button type="button" text="Crear Orden" />
      </NavLink>
    </div>
  );
};

export default Order;
