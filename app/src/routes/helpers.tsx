import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};

export function ProtectedRoute({ isAuthenticated, authenticationPath, outlet }: ProtectedRouteProps) {
    if (isAuthenticated) {
        return outlet;
    } else {
        return <Navigate to={ { pathname: authenticationPath } } replace />;
    }
};

export type PublicRouteProps = {
    isAuthenticated: boolean;
    outlet: JSX.Element;
};

// Uno reverse ProtectedRoute to always redirect back to the dasboard.
export function PublicRoute({ isAuthenticated, outlet }: PublicRouteProps) {
    if (isAuthenticated) {
        return <Navigate to={ { pathname: '/' } } replace />;
    } else {
        return outlet;
    }
};
