import React, { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al usuario a la página raíz después del cierre de sesión
  };

  return (
    <button onClick={handleLogout} className="navbar-logout">
      Log out
    </button>
  );
};

export default LogoutButton;
