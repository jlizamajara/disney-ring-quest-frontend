import "./LogInPage.css"
import React, {useState, useContext} from "react";
import axios from 'axios';
import { AuthContext } from "../../auth/authContext";

function LogInPage(){
    const {token, setToken} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [msg, setMsg] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Apretaste el form")
        // Se envia un post a la ruta log in
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,{
            email,
            password
        }).then((response)=> {
            // Si no hay error se entra aquí
            console.log(response)
            setError(false);
            setMsg("Login successful!");

            // Se guarda token en localStorage con la llave token
            const access_token = response.data.access_token;
            setToken(access_token);  

        }).catch((error) => {
            console.error('An error occurred while trying to login:', error);
            if (error.response && error.response.data){
                const {status, data} = error.response;

                if (status == 400) {
                    if (data.includes("was not found")){
                        setErrorMsg("The user with the given email was not found.");
                    } else if (data == "Incorrect password"){
                        setErrorMsg("Incorrect password.")
                    } else if (data.includes("Please fill in all the fields")){
                        setErrorMsg("Please fill in all the fields")
                    } else if (data.includes("Invalid email address")){
                        setErrorMsg("Invalid email address")
                    } else if (data.includes("Invalid password")){
                        setErrorMsg("Password length between 4 and 20 characters")
                    } else {
                        setErrorMsg("An error occurred during login, please try again.");
                    }
                }
            } else {
                setMsg("An error occurred during login, please try again.");
            }
            setError(true);
        })
    };

    return (
        <div className="login-container">
            {msg.length > 0 && <div className="successMsg"> {msg} </div>}
            {error && <div className="error"> {errorMsg} </div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-field"
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input-field"
                        required/>
                </div>
                <button type="submit">Log In</button>
            </form>
            </div>

    )
}

export default LogInPage;