import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";


function AuthProvider({ children} ){
    // Si no encuentra token, guarda valor NULL
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        // Si se produce cambio en el token, se setea el token según el cambio
        localStorage.setItem("token", token);
    }, [token])

    function logout(){
        setToken("");
    }

    return (
       <AuthContext.Provider value={{token, setToken, logout}}>
        {children}
       </AuthContext.Provider> 
    )
}

export default AuthProvider;
