import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const UserContext = createContext()

const UserProvider = ({children}) => {
       
    const [ user, setUser] = useState(false)
    
    useEffect(() => {
      const unsuscribe = onAuthStateChanged(auth, (user) => {
        //   console.log("desde on suscribe"+user);
          if(user){
              const {email, displayName, photoURL, uid} = user
              setUser({email, displayName, photoURL, uid})
             // console.log("despues del set user"+ user);

        }else{
            setUser(null)
        }
      })
      return () => unsuscribe()
    }, [])
    

    const registerUser = async (mail, password) =>{
       await createUserWithEmailAndPassword( auth,mail,password)
    }

    const loginUser = async(mail, password) =>{
        await  signInWithEmailAndPassword(auth,mail,password)
        console.log("user activo");
    }

    const logoutUser = async () =>{
        await signOut(auth)
       console.log("user cerrado");
    }

    
    return (
        <UserContext.Provider value={{user, registerUser,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;