import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "lcdoecheverria@gmail.com"
    }
  });

  const {loginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
          await loginUser(email, password);
          navigate("/")
        //   navigate(0)
        }catch (error) {
            console.log(error.code);
        }
  }

  return (
    <>
      <h1> Login </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>correo</p>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>Campo Obligatorio</p>}

        <p>contraseña</p>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>Campo Obligatorio</p>}
        <button type="submit">iniciar Sesion</button>
      </form>
    </>
  );
};

export default Login;
