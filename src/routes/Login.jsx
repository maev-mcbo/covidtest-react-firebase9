import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Login = () => {

    const {user, setUser} = useContext(UserContext)

    return (
        <>
            <h1> Login </h1>
            <h2>{ user ? "online" : "offline"} </h2>
            <button onClick={() => {
                setUser(true)
            }}> Login</button>
        </>
    )
};

export default Login