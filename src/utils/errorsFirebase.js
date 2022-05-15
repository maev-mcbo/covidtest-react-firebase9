export const errorsFirebase = (code) => {


    switch (code) {
        case "auth/email-already-in-use":
            return {
                code: "email",
                message: "Correo ya existe"
            }

        case "auth/invalid-email":
            return {
                code: "email",
                message: "Correo ya existe"
            }

        case "auth/internal-error":
            return {
                code: "email",
                message: "Error interno"
            }
           

        case "auth/wrong-password":
            return {
                code: "email",
                message: "Contraseña incorrecta"
            }
          

        case "auth/user-not-found":
            return {
                code: "email",
                message: "Usuario no existe"
            }
        
        case "auth/too-many-requests":
            return {
                code: "email",
                message: "Demasiados intentos"
            }
          

        default:
            return {
                code: "code",
                message: "algo paso :C"
            }
            
            
    }
}


