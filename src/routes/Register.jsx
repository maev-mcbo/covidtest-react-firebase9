import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValues,
  } = useForm({
    defaultValues: {
      email: "lcdoecheverria@gmail.com"
    }
  });

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    
    try {

      await registerUser(email, password);

    } catch (error) {
      console.log(error.message)
      if (error.code === "auth/email-already-in-use")
       console.log("Usuario ya registrado");
    }
  };

  return (
    <>
      <h1> Registrarse </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>correo</p>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>Campo Obligatorio</p>}
        <p>contraseña</p>
        <input
          type="password"
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "minimo 6 caracteres",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <p>Repita contraseña</p>
        <input
          type="password"
          {...register("passwordConfirm", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "no coinciden las contraseñas",
              //   message: "no coinciden las contraseñas"
            },
          })}
        />
        {errors.passwordConfirm && <p> {errors.passwordConfirm.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
