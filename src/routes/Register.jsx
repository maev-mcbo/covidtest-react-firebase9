import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { useNavigate } from "react-router-dom";

import FormError from "../components/FormErrors";
import FormInputText from "../components/inputs/FormInputText";
import H1Compontent from "../components/titles/H1Compontent";
import Button from "../components/buttons/Button";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H1Compontent text="Registrarse" />

        <FormInputText
          type="email"
          placeholder="Coloque su Correo"
          label="Correo Electrónico"
          error={errors.email}
          {...register("email",{ min:{value: 6, message: "Muy corto"}, pattern:{value:  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/, message: "esto no es un email"} })}
        >
          <FormError error={errors.email} />
        </FormInputText>

        <FormInputText
          type="password"
          label="Contraseña"
          placeholder="ingrese su contraseña"
          {...register("password", { min:{value: 6, message: "Muy corto"}  })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInputText>

        <FormInputText
          type="password"
          label="Repita Contraseña"
          placeholder="vuelva a escribir su contraseña"
          error={errors.passwordConfirm}
          {...register("passwordConfirm", {
            required: true,
            validate: {
              equals: (v) =>
                v === getValues("password") || "no coinciden las contraseñas",
            },
          })}
        >
          <FormError error={errors.passwordConfirm} />
          
        </FormInputText>

          <Button text="Registrarse" type="submit" />

      </form>
     
    </>
  );
};

export default Register;
