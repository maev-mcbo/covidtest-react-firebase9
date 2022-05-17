import React from "react";
import { NavLink } from "react-router-dom";
import H1Compontent from "../components/titles/H1Compontent";
import Button from "../components/buttons/Button";
import Orderlist from "../components/lists/Orderlist";

const Order = () => {
  return (
    <div className="mx-auto">
      <H1Compontent text="Bandeja de ordenes" />
      <Orderlist />
      <NavLink to="/create">
        <Button type="button" text="Crear Orden" />
      </NavLink>
    </div>
  );
};

export default Order;
