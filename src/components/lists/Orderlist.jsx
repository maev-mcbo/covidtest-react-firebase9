import React, { useEffect } from "react";
import { useDB } from "../../hooks/useDB";
import Button from "../buttons/Button";
import SpinnerLoader from "../SpinnerLoader";

function Orderlist() {
  const { getOrders, data, loading, deleteData } = useDB();
  useEffect(() => {
    getOrders();
  }, []);
  if (loading.getOrdersLoading) return <SpinnerLoader />;

  console.log("Esta es el id:  " + data);

  const handleDeleteButton = (id) => {
   deleteData(id)
  };

  const handleDetailsButton = () => {
    console.log("detalles");
  };
  return (
    <>
      
        {data.map((item) => (
          <div className=" p-6 mb-5 max-w 
          bg-white rounded-lg border 
          border-gray-200 shadow-md  
          dark:bg-gray-800 
          dark:border-gray-700 
          dark:hover:bg-gray-700">
         <ul key={item.id}>
              <li >
                <p>id: {item.id}</p>
                <p>Nombre: {item.data.fname} {item.data.lname} </p>
              </li>
              <Button text="borrar" onClick={ () => handleDeleteButton(item.id)} loading={loading[item.id]}/>
              </ul>
</div>
        ))}
     
    </>
  );
}

export default Orderlist;
