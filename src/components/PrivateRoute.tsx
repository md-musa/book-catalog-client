import React from 'react';
import { Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

const PrivateRoute = () => {
  const location = useLocation();

  const token = useSelector(state => state.auth.accessToken);
  console.log(token);

  if (token) return <Outlet />;
  else return <Login />;
};

export default PrivateRoute;
