import React from "react";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { useDB } from "../hooks/useDB";

import FormInputText from "./inputs/FormInputText";
import FormError from "../components/FormErrors";
import H1Compontent from "./titles/H1Compontent";
import Button from "./buttons/Button";
import SelectGenderInput from "./selects/SelectGenderInput";
import SelectCountryInput from "./selects/SelectCountryInput";
import SelectTestInput from "./selects/SelectTestInput";
import SelectSucursalInput from "./selects/SelectSucursalInput";
import SelectLinesInput from "./selects/SelectLinesInput";

const OrderForm = () => {
const {addOrder, loading} = useDB()

 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (orderData) => {
    try {

      console.log(orderData);
      await addOrder(orderData)
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
          type="text"
          placeholder="Ingrese el cedula"
          label="Cedula"
          error={errors.cid}
          {...register("cid", {
            minLength: { value: 3, message: "Cedula invalida" },
            pattern: {value: /^[0-9]*$/ , message: "Solo numeros"}
          })}
        >
          <FormError error={errors.cid} />
        </FormInputText>

        <FormInputText
          type="text"
          placeholder="Ingrese el nombre"
          label="Nombre"
          error={errors.fname}
          {...register("fname", {
            required: true,
            minLength: { value: 3, message: "Nombre muy corto" },
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
            minLength: { value: 3, message: "Apellido muy corto" },
          })}
        >
          <FormError error={errors.lname} />
        </FormInputText>

        <FormInputText
          type="email"
          placeholder=""
          label="Correo"
          error={errors.email}
          {...register("email", { pattern:{value:  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/, message: "Esto no es un Email" }
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
            minLength: { value: 3, message: "Numero de Pasaporte ivalido" },
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
            valueAsDate: true,
          })}
        >
          <FormError error={errors.dob} />
        </FormInputText>

        <SelectGenderInput
          label="Genero"
          error={errors.gender}
          {...register("gender", {required: true, message:"Seleccione un Genero"})}
        >
          <FormError error={errors.gender} />
        </SelectGenderInput>

        <SelectCountryInput
          label="Seleccione Pais de Nacimiento"
          error={errors.country}
          {...register("country",{required: true,message:"Seleccione un Genero"})}
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
            minLength: { value: 3, message: "Dirección invalida" },
          })}
        >
          <FormError error={errors.address} />
        </FormInputText>

        <h1 className="text-2xl p-3">Datos de la Orden</h1>

        <SelectTestInput
          label="Seleccione tipo de prueba:"
          error={errors.testtype}
          {...register("testtype" ,{required:{value:true, message: "Seleccione un tipo de prueba"}})}
        >
          <FormError error={errors.testtype} />
        </SelectTestInput>

        <SelectSucursalInput
          label="Seleccione Sucursal"
          error={errors.suc}
          {...register("suc",{required:{value:true, message: "Seleccione una Sucursal"}})}
        >
          <FormError error={errors.suc} />
        </SelectSucursalInput>
        
        
        <h1 className="text-2xl p-3">Datos del Vuelo</h1>

        <SelectCountryInput
          label="Seleccione Pais de Origen"
          error={errors.origin}
          {...register("origin", {required:{value:true, message: "Seleccione un Pais de Origen"}})}
        >
          <FormError error={errors.origin} />
        </SelectCountryInput>

        <SelectCountryInput
          label="Seleccione Pais de Destino"
          error={errors.dest}
          {...register("dest" ,{required:{value:true, message: "Seleccione un destino"}})}
        >
          <FormError error={errors.dest} />
        </SelectCountryInput>
          
          <SelectLinesInput 
                  label="Aerolinea"
                  error={errors.lines}
                  {...register("lines" ,{required:{value:true, message: "Seleccione una Aerolinea"}})}
                >
                  <FormError error={errors.lines} />

          </SelectLinesInput>
        
        <FormInputText
          type="date"
          placeholder=""
          label="Fecha de Salida"
          error={errors.departureDate}
          {...register("departureDate", {valueAsDate:true})}
        >
          <FormError error={errors.departureDate} />
        </FormInputText>
        <FormInputText
          type="date"
          placeholder=""
          label="Fecha de llegada"
          error={errors.arrivaldate}
          {...register("arrivaldate", {valueAsDate:true})}
        >
          <FormError error={errors.arrivaldate} />
        </FormInputText>


        <Button type="submit" loading={loading.addOrderLoading} text="Crear Orden" />
     
      </form>
    </div>
  );
};

export default OrderForm;
