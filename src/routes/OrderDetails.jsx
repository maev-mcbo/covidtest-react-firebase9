import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDB } from "../hooks/useDB";

import ButtonOutline from "../components/buttons/ButtonOutline";
import SpinnerLoader from "../components/SpinnerLoader";
import H1Compontent from "../components/titles/H1Compontent";
import SelectPaymentStatus from "../components/selects/SelectPaymentStatus";
import Swal from "sweetalert2";

function OrderDetails() {
  const { id } = useParams();
  const {
    getSingleOrder,
    loading,
    data,
    deleteData,
    paymenteManager,
    resultManager,
  } = useDB();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    getSingleOrder(id);
    setTrigger(false);
  }, [trigger == true]);

  /**
   * When the user clicks the button, the payment div will fade in.
   */
  const showPaymentSelect = () => {
    const el = document.getElementById("payment").classList;
    el.toggle("hidden");

  };

  /**
   * If the user clicks the confirm button, then delete the data and go back to the previous page.
   */
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
      }
    });
  };

  /**
   * It's a function that opens a modal with a form, and if the form is filled correctly, it closes the
   * modal and opens a success modal.
   * I've tried to use the same function to open the success modal, but it
   * @returns the value of the variable trigger.
   */
  const handlePayment = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Datos del pago",
      html:
        "<h3> Estatus del Pago</h3>" +
        '<select required id="paymentStatusform" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> <option disabled selected value="1"> Seleccione Uno </option> <option value="aprobado"> Aprobado </option><option value="negado"> Negado </option> </select>' +
        "<br>" +
        "<h3> Tipo de Moneda </h3>" +
        '<select id="paymentCurrency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> <option disabled selected value="1"> Seleccione Uno </option><option value="dolares"> Dolares </option><option value="bolivares">Bolivares </option> </select>' +
        "<br>" +
        "<h3> Ingrese monto del pago </h3>" +
        '<input type="number" id="amaunt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">' +
        "<br>" +
        "<h3> Referencia </h3>" +
        '<textarea id="ref" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      preConfirm: () => {
        return [
          {
            status: document.getElementById("paymentStatusform").value,
            currency: document.getElementById("paymentCurrency").value,
            ref: document.getElementById("ref").value,
            amaunt: document.getElementById("amaunt").value,
          },
        ];
      },
    });

    if (formValues) {
      if (formValues[0].status == 1) {
        Swal.fire("Error!", "Debe seleccionar un status.", "info").then(
          (result) => {
            if (result.isConfirmed) {
              handlePayment();
            }
          }
        );
        return;
      }
      if (formValues[0].currency == 1) {
        Swal.fire("Error!", "Debe seleccionar una moneda", "info").then(
          (result) => {
            if (result.isConfirmed) {
              handlePayment();
            }
          }
        );
        return;
      }
      if (formValues[0].amaunt == "") {
        Swal.fire("Error!", "Debe ingresar un monto", "info").then((result) => {
          if (result.isConfirmed) {
            handlePayment();
          }
        });
        return;
      }

      Swal.fire({
        title: "Exito!",
        text: "Resultado cargado",
        icon: "success",
        confirmButtonColor: "#3085d6",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      paymenteManager(
        formValues[0].status,
        formValues[0].currency,
        formValues[0].ref,
        formValues[0].amaunt,
        id
      );
      setTrigger(true);
    }
  };

  const handleResult = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Evaluar Muestra",
      html:
        "<h3> Resultado </h3>" +
        '<select id="testresult" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> <option disabled selected value="1"> Seleccione Uno </option><option value="Positivo"> Positivo </option><option value="Negativo">Negativo </option> </select>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      preConfirm: () => {
        return [
          {
            result: document.getElementById("testresult").value,
          },
        ];
      },
    });

    if (formValues) {
      if (formValues[0].result == 1) {
        Swal.fire({
          title: "Error!",
          text: "Debe seleccionar un status.",
          icon: "info",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            handleResult();
          }
        });
        return;
      }

      Swal.fire({
        title: "Exito!",
        text: "Resultado cargado",
        icon: "success",
        confirmButtonColor: "#3085d6",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      resultManager(formValues[0].result, id);
      setTrigger(true);
    }
  };

  return (
    <>
      <div>
        <H1Compontent className="mb-5" text="Detalles de la orden" />
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
                  {data.paymentStatus}
                  <span className="pl-4">
                    <ButtonOutline
                      onClick={() => {
                        handlePayment();
                      }}
                      text="Agregar Pago"
                    />
                  </span>
                  <span className="pl-4">
                    <ButtonOutline
                      onClick={() => {
                        showPaymentSelect();
                      }}
                      text="Modificar Pago"
                    />
                  </span>
                </p>
                <p className="text-xs">Resultado: </p>
                <p className="text-xl ">
                  {data.testResult}
                  <span className="pl-4">
                    <ButtonOutline
                      text="Cargar Resultado"
                      onClick={() => {
                        handleResult();
                      }}
                    />
                  </span>
                </p>
              </div>
              <div className="item w-4/12 h-32 flex-grow">
                <p className="text-xs">Id de orden:</p>
                <p className="text-xl pb-4">{id}</p>
                <p className="text-xs">Telefono:</p>
                <p className="text-xl pb-4">{data.phone}</p>
                <p className="text-xs">destino:</p>
                <p className="text-xl pb-4">{data.dest}</p>
                <p className="text-xs"># de vuelo:</p>
                <p className="text-xl pb-4">{data.fseat}</p>
                <div id="payment" className="hidden">
                  <SelectPaymentStatus />
                  <span>
                    <ButtonOutline text="confirmar" onClick={() => {
                          const el = document.getElementById("payment").classList;
                          el.toggle("hidden" );
                          
                    }}/>
                  </span>
                </div>
              </div>
            </div>
          )}

          <ButtonOutline
            text="Borrar"
            onClick={() => {
              handleDeleteButton(id);
            }}
          />

          <ButtonOutline
            text="Ver Comprobante"
            onClick={() => {
              console.log(id);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
