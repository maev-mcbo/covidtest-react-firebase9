import React from "react";

// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";

// import { formValidate } from "../utils/formvalidate";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormInputText from "../components/FormInputText";
import FormError from "../components/FormErrors";
import H1Compontent from "../components/H1Compontent";
import Button from "../components/button";
import SelectGenderInput from "./SelectGenderInput";
import SelectCountryInput from "./SelectCountryInput";
import SelectTestInput from "./SelectTestInput";
import SelectSucursalInput from "./SelectSucursalInput";
import SelectLinesInput from "./SelectLinesInput";

const OrderForm = () => {
  // const navigate = useNavigate();
  // const { minLength } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, {
        message,
      });
    }
  };

  return (
    <div className="w-1/2 p-3 mx-auto">
      <H1Compontent text="Crear Orden" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl p-3">Datos Personales</h1>
        <FormInputText
          type="number"
          placeholder=""
          label="Cedula"
          error={errors.cid}
          {...register("cid", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.cid} />
        </FormInputText>

        <FormInputText
          type="text"
          placeholder=""
          label="Nombre"
          error={errors.fname}
          {...register("fname", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.fname} />
        </FormInputText>

        <FormInputText
          type="text"
          placeholder=""
          label="Apellido"
          error={errors.lname}
          {...register("lname", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.lname} />
        </FormInputText>

        <FormInputText
          type="email"
          placeholder=""
          label="Correo"
          error={errors.email}
          {...register("email", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.email} />
        </FormInputText>

        <FormInputText
          type="text"
          placeholder=""
          label="Pasaporte"
          error={errors.passport}
          {...register("passport", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.passport} />
        </FormInputText>

        <FormInputText
          type="date"
          placeholder=""
          label="Fecha de Nacimiento"
          error={errors.dob}
          {...register("dob", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.dob} />
        </FormInputText>

        <SelectGenderInput
          label="Genero"
          error={errors.gender}
          {...register("gender", {required: true})}
        >
          <FormError error={errors.gender} />
        </SelectGenderInput>

        <SelectCountryInput
          label="Seleccione Pais de Nacimiento"
          error={errors.country}
          {...register("country",{required: true})}
        >
          <FormError error={errors.country} />
        </SelectCountryInput>

        <FormInputText
          type="text"
          placeholder=""
          label="Dirección"
          error={errors.address}
          {...register("address", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.address} />
        </FormInputText>

        <h1 className="text-2xl p-3">Datos de la Orden</h1>

        <SelectTestInput
          label="Seleccione tipo de prueba:"
          error={errors.testtype}
          {...register("testtype")}
        >
          <FormError error={errors.testtype} />
        </SelectTestInput>

        <SelectSucursalInput
          label="Seleccione Sucursal"
          error={errors.suc}
          {...register("suc")}
        >
          <FormError error={errors.suc} />
        </SelectSucursalInput>
        
        
        <h1 className="text-2xl p-3">Datos del Vuelo</h1>

        <SelectCountryInput
          label="Seleccione Pais de Origen"
          error={errors.origin}
          {...register("origin")}
        >
          <FormError error={errors.origin} />
        </SelectCountryInput>

        <SelectCountryInput
          label="Seleccione Pais de Destino"
          error={errors.dest}
          {...register("dest")}
        >
          <FormError error={errors.dest} />
        </SelectCountryInput>
          
          <SelectLinesInput 
                  label="Aerolinea"
                  error={errors.lines}
                  {...register("lines")}
                >
                  <FormError error={errors.lines} />

          </SelectLinesInput>
        
        <FormInputText
          type="date"
          placeholder=""
          label="Fecha de Salida"
          error={errors.departureDate}
          {...register("departureDate", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.departureDate} />
        </FormInputText>
        <FormInputText
          type="date"
          placeholder=""
          label="Fecha de llegada"
          error={errors.arrivaldate}
          {...register("arrivaldate", {
            required: true,
            minLength: { value: 3, message: "muy corto" },
          })}
        >
          <FormError error={errors.arrivaldate} />
        </FormInputText>


        <Button type="submit" text="Crear Orden" />
      </form>
    </div>
  );
};

export default OrderForm;
