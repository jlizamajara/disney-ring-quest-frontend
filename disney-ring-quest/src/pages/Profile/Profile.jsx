import "./Profile.css"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../auth/authContext";

export default function Profile() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get(`${url}/users/currentUser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.log(error);
      }
    };

    const getUser = async () => {
      try {
        const response = await axios.get(`${url}/users/user/${userId}`);
        setCurrentUser(response.data);
      } catch (error) {
        alert(error);
      }
    };

    if (userId) {
      getUser();
    } else {
      getUserId();
    }
  }, [userId]);

  return (
    <div className="profile-page">
      <div className="background-profile">
        <div id="title-profile">Mi Perfil</div>
      </div>
      <div className="big-box" id="profile-content">
        <div className="box-sides">
          <div className="box-1" id="data-profile">
            <div id="username">Nombre usuario:</div>
            <div id="email">Correo electrónico:</div>
            <div id="password">Contraseña:</div>
          </div>

          {currentUser ? (
            <div className="box-1" id="data-profile">
              <div id="username">{currentUser.username}</div>
              <div id="email">{currentUser.email}</div>
              <div id="password">*******</div>
            </div>
          ) : (
            <div className="box-1" id="data-profile">
              <div id="username"></div>
              <div id="email"></div>
              <div id="password"></div>
            </div>
          )}
        </div>
        <div className="saveButton">
          <button id="save-profile">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}