import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export const UserContext = createContext()

const UserProvider = ({children}) => {
       
    const [ user, setUser] = useState(false)
    // const navigate = useNavigate()
    
    useEffect(() => {
      const unsuscribe = onAuthStateChanged(auth, (user) => {
          if(user){
              const {email, displayName, photoURL, uid} = user
              setUser({email, displayName, photoURL, uid})

        }else{
            setUser(null)
        }
      })
      return () => unsuscribe()
    }, [])
    

    const registerUser = async (email, password) =>{
       await createUserWithEmailAndPassword( auth,email,password);
    }

    const loginUser =  (mail, password) =>{
         return signInWithEmailAndPassword(auth,mail,password);

    
    }

    const logoutUser = async () =>{
        return await signOut(auth)
        // navigate("/login")
    }

    
    return (
        <UserContext.Provider value={{user, registerUser,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;