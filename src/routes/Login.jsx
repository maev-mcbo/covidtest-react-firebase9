import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";

import { formValidate } from "../utils/formvalidate";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormInputText from "../components/FormInputText";
import FormError from "../components/FormErrors";
import H1Compontent from "../components/H1Compontent";
import Button from "../components/button";
import ButtonLoading from "../components/ButtonLoading";

const Login = () => {
  const [loading, setLoading] = useState();
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { minLength } = formValidate();

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
          placeholder="Coloque su Correo"
          label="Correo Electrónico"
          error={errors.email}
          {...register("email", { minLength })}
        >
          <FormError error={errors.email} />
        </FormInputText>

        <FormInputText
          type="password"
          label="Contraseña"
          placeholder="ingrese su contraseña"
          {...register("password", { minLength })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInputText>

        {
          loading  ? ( <ButtonLoading text="Iniciando Sesion" /> ) : ( <Button type="submit" text="Iniciar Sesion" />)
        }

      </form>
    </>
  );
};

export default Login;
