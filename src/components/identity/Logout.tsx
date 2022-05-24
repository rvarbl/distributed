import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../services/identity/AuthenticationService';
import { AppContext } from '../../state/AppContext';
import Home from '../Home';

export const Logout = () => {
  let appState = useContext(AppContext);
  appState.setUser(undefined)
  localStorage.clear()
  //window.location.reload();
  return (<Navigate to="/" />);
};

export default Logout;