import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useAuth } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const user = useAuth();
  const user = {
    name: 'Nam'
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, user]);

  return children;
}
