import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { Text } from '../typography';

type PrivateRouteProps = {
  children: React.ReactElement;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <Text>Загрузка…</Text>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/auth' replace state={{ from: location.pathname }} />;
  }

  return children;
};
