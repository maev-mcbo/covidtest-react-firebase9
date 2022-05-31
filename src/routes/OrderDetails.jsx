import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/buttons/Button";
import ButtonOutline from "../components/buttons/ButtonOutline";

import SpinnerLoader from "../components/SpinnerLoader";
import H1Compontent from "../components/titles/H1Compontent";
import { useDB } from "../hooks/useDB";
import Swal from "sweetalert2";
import { async } from "@firebase/util";

function OrderDetails() {
  const { id } = useParams();
  const { getSingleOrder, loading, data, deleteData, paymenteManager } =
    useDB();

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

  const handlePayment = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Ingrese el pago",
      html:
        "<h3> Estatus del Pago</h3>" +
        '<select id="paymentStatusform" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> <option disabled selected value="1"> Seleccione Uno </option> <option value="aprobado"> Aprobado </option><option value="negado"> Negado </option> </select>' +
        "<br>" +
        "<h3> Tipo de Moneda </h3>" +
        '<select id="paymentCurrency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> <option disabled selected value="1"> Seleccione Uno </option><option value="dolares"> Dolares </option><option value="bolivares">Bolivares </option> </select>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      preConfirm: () => {
        return [
          {
            status: document.getElementById("paymentStatusform").value,
            currency: document.getElementById("paymentCurrency").value,
          },
        ];
      },
    });

    if (formValues) {
      if (formValues[0].status == 1) {
        Swal.fire("Error!", "Debe seleccionar un status.", "info")
        .then((result) => {
          if(result.isConfirmed) {
            handlePayment()
          }
        });
        return
      }
      if (formValues[0].currency == 1) {
        Swal.fire("Error!", "Debe seleccionar una moneda", "info")
        .then((result) => {
          if(result.isConfirmed) {
            handlePayment()
          }
        });
        return
      }

      Swal.fire("Exito!", "Pago cargado", "success")
      console.log(JSON.stringify(formValues));
    } 
  };
  return (
    <>
      <div>
        <H1Compontent text="Detalles de la orden" />
        <div className=" p-6 mb-5 max-w bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          {loading.getSingleOrderLoading ? (
            <SpinnerLoader />
          ) : (
            <div className="grid overflow-hidden grid-cols-2 grid-rows-1 gap-6 uppercase">
              <div className="item">
                <ButtonOutline
                  text="Volver"
                  onClick={() => {
                    history.back();
                  }}
                />
                <p className="text-xs">Nombre:</p>
                <p className="text-xl pb-4">
                  {data.fname} {data.lname}
                </p>
                <p className="text-xs">Cedula:</p>
                <p className="text-xl pb-4">{data.cid}</p>
                <p className="text-xs">Pasaporte:</p>
                <p className="text-xl pb-4">{data.passport}</p>
                <p className="text-xs">Origen:</p>
                <p className="text-xl pb-4">{data.origin}</p>
                <p className="text-xs">Fecha de Salida:</p>
                <p className="text-xl pb-4">{data.departureDate}</p>
                <p className="text-xs">Aerolinea:</p>
                <p className="text-xl pb-4">{data.lines}</p>
                <p className="text-xs">Tipo de Prueba:</p>
                <p className="text-xl pb-4">{data.testtype}</p>
                <p className="text-xs">Estado del pago:</p>
                <p className="align-middle text-xl">
                  {data.paymentStatus}{" "}
                  <span>
                    {" "}
                    <ButtonOutline
                      onClick={() => {
                        handlePayment();
                      }}
                      text="Agregar Pago"
                    />
                  </span>{" "}
                  <span>
                    {" "}
                    <ButtonOutline text="Modificar Pago" />
                  </span>
                </p>
                <p className="text-xs">Resultado: </p>
                <p className="text-xl pb-4">
                  {data.testResult}{" "}
                  <span>
                    {" "}
                    <ButtonOutline text="Modificar Resultado" />{" "}
                  </span>{" "}
                </p>
              </div>
              <div className="item w-4/12 h-32 flex-grow">
                <p className="text-xs">Id de orden:</p>
                <p className="text-xl pb-4">{data.id}</p>
                <p className="text-xs">Telefono:</p>
                <p className="text-xl pb-4">{data.phone}</p>
                <p className="text-xs">destino:</p>
                <p className="text-xl pb-4">{data.dest}</p>
                <p className="text-xs"># de vuelo:</p>
                <p className="text-xl pb-4">{data.fseat}</p>
              </div>
            </div>
          )}

          <ButtonOutline
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
