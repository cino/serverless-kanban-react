import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export type ProtectedRouteProps = {
    outlet: JSX.Element;
}

export function ProtectedRoute({ outlet }: ProtectedRouteProps) {
    const user = useAppSelector(state => state.auth);
    const isAuthenticated = user.email !== null && user.email !== undefined;

    if (isAuthenticated) {
        return outlet;
    }

    return <Navigate to={{ pathname: '/auth/login' }} replace />;
}

export type PublicRouteProps = {
    outlet: JSX.Element;
}

// Uno reverse ProtectedRoute to always redirect back to the dasboard.
export function PublicRoute({ outlet }: PublicRouteProps) {
    const user = useAppSelector(state => state.auth);
    const isAuthenticated = user.email !== null && user.email !== undefined;

    if (isAuthenticated) {
        return <Navigate to={{ pathname: '/' }} replace />;
    }

    return outlet;
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
