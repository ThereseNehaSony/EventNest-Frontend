// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const withAuthentication = (WrappedComponent: React.ComponentType<any>, user: any) => {
//   return (props: any) => {
//     if (!user) {
//       return <Navigate to="/login" replace />;
//     }
//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuthentication;


// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


interface ProtectedRouteProps {
  roles: string[]; 
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children }) => {
  const { user } = useSelector((state: any) => state.user);
 
  if (!user  ) {
    
    return <Navigate to="/" replace />;
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;
