import React from "react";
import { NavLink } from "react-router-dom";
import { useDB } from "../hooks/useDB";
import Button from "./buttons/Button";

function OrderListComponent({ fname, lname, passport, cid, orderid, key }) {




  return (
    <div key={key}  className="container w-full p-6 mb-5 max-w bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid overflow-hidden grid-cols-5 grid-rows-1 gap-6">
        <div className="item">
          <p className="text-center align-middle font-bold">Nombre</p>
          <p className="text-center align-middle">{fname} {lname} </p>
     
        </div>
        <div className="item w-4/12 h-32 flex-grow">
          <p className="text-center align-middle font-bold">Cedula</p>
          <p className="text-center align-middle"> {cid}</p>
        </div>
        <div className="item w-4/12 h-32 flex-grow">
          <p className="text-center align-middle font-bold">Pasaporte</p>
          <p className="text-center align-middle"> {passport}</p>
        </div>
        <div className="item w-4/12 h-32 flex-grow">
          <p className="text-center align-middle font-bold">Order ID</p>
          <p className="text-center align-middle"> {orderid}</p>
        </div>
        <div className="item w-4/12 h-32 flex-grow text-center">
        <NavLink to={`/order/orderdetail/${orderid}`}>
                      <Button  text="Ver Orden" />
                    </NavLink>

 
        </div>
      </div>
    </div>
  );
  }

export default OrderListComponent;
