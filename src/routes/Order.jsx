import React from "react";
import { NavLink } from "react-router-dom";
import H1Compontent from "../components/titles/H1Compontent";
import Button from "../components/buttons/Button";
import OrderListComponent from "../components/OrderListComponent";
import Orderlist from "../components/lists/Orderlist";

const Order = () => {
  return (
    <div className="mx-auto">
      <H1Compontent text="Bandeja de ordenes" />
      <NavLink to="/create">
          <Button text="Crear Orden" />
      </NavLink>
      <Orderlist />
    </div>
  );
};

export default Order;
