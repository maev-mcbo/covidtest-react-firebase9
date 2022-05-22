import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/buttons/Button";
import SpinnerLoader from "../components/SpinnerLoader";
import H1Compontent from "../components/titles/H1Compontent";
import { useDB } from "../hooks/useDB";
import Swal from "sweetalert2";

function OrderDetails() {
  const { id } = useParams();
  const { getSingleOrder, loading, data, deleteData } = useDB();

  useEffect(() => {
    getSingleOrder(id);
  }, []);
  const handleDeleteButton = (id) => {
    Swal.fire({
      title: "Esta seguro que desea Eliminar esta orden?",
      text: "una vez eliminada no podras recuperarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrarla",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Borrada",
          "Tu orden ha sido eliminada",
          "success",
          deleteData(id),
          history.back()
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelado", "La orden no se ha iliminada", "error");
      }
    });
  };

  return (
    <>
      <div>
        <H1Compontent
          text={`Detalle de la orden ${id} de la persona ${data.fname}`}
        />
        <div className=" p-6 mb-5 max-w bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          {loading.getSingleOrderLoading ? (
            <SpinnerLoader />
          ) : (
            <div>
              <p>{data.address}</p>
              <p>{data.arrivaldate}</p>
              <p>{data.cid}</p>
              <p>{data.country}</p>
              <p>{data.createdBy}</p>
              <p>{data.departureDate}</p>
              <p>{data.dest}</p>
              <p>{data.dob}</p>
              <p>{data.email}</p>
              <p>{data.fname}</p>
              <p>{data.gender}</p>
              <p>{data.lines}</p>
              <p>{data.lname}</p>
              <p>{data.origin}</p>
              <p>{data.passport}</p>
              <p>{data.suc}</p>
              <p>{data.testtype}</p>
            </div>
          )}

          <Button
            text="Volver"
            onClick={() => {
              history.back();
            }}
          />

          <Button
            text="Borrar"
            onClick={() => {
              handleDeleteButton(id);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
