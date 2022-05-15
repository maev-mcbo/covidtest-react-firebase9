import { async } from '@firebase/util'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import Button from '../components/button'
import FormError from '../components/FormErrors'
import FormInputText from '../components/FormInputText'
import H1Compontent from '../components/H1Compontent'
import { useDB } from '../hooks/useDB'

function AddBranch() {
     
    const {addBranch} = useDB()
    const {handleSubmit, formState: { errors}, register} = useForm()

    const onSubmit = async (branchData) => {
       try {
        addBranch(branchData)
       } catch (error) {
           console.log(error)
       }
    }

    return (
    <div className='w-1/2 mx-auto'>
    <H1Compontent text="Agregar Sucursal" />
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          type="text"
          placeholder="Lab san Lorenzo"
          label="Nombre de la Sucursal"
          error={errors.suc}
          {...register("suc", { minLength:{value: 3, message:'Nombre muy corto'} })}
        >
          <FormError error={errors.suc} />
        </FormInputText>

        <FormInputText
          type="text"
          placeholder="Urb Maracaibo"
          label="Direccion"
          error={errors.sucAddress}
          {...register("sucAddress", { minLength:{value: 3, message:'Nombre muy corto'} })}
        >
          <FormError error={errors.sucAddress} />
        </FormInputText>

        <Button type="submit" text="Agregar Sucursal" />
        </form>
        <NavLink to="/branches">
      <Button type="button" text="Volver" />
    </NavLink>
    </div>
  )
}

export default AddBranch