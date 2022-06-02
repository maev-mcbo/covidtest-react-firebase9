import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormInputText from "../components/inputs/FormInputText";
import FormError from "../components/FormErrors";
import H1Compontent from "../components/titles/H1Compontent";
import Button from "../components/buttons/Button";
import ButtonLoading from "../components/buttons/ButtonLoading";

const Login = () => {
  const [loading, setLoading] = useState();
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      await loginUser(email, password);
      navigate("/dashboard ");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <H1Compontent text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          type="email"
          id="email"
          placeholder="Coloque su Correo"
          label="Correo Electrónico"
          error={errors.email}
          {...register("email", { pattern:{value:  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/, message: "esto no es un email"} })}
        >
          <FormError error={errors.email} />
        </FormInputText>

        <FormInputText
          type="password"
          id="pass"
          label="Contraseña"
          placeholder="ingrese su contraseña"
          {...register("password", { minLength:{value: 6, message: "Contraseña muy corta"} })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInputText>

        
      {
        loading ? ( 
        
          <ButtonLoading text="Iniciando Sesion" />
          ) : (
            <Button text="Iniciar Sesion" /> 
          )
      }

      </form>
    </>
  );
};

export default Login;
