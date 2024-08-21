import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole: string | undefined | null;
  redirectPath?: string;
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  allowedRoles,
  userRole,
  redirectPath = '/login',
  element,
}) => {
  if (!isAuthenticated || !allowedRoles.includes(userRole || '')) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default ProtectedRoute;
