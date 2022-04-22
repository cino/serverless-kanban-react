import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export type RouteProps = {
    outlet: JSX.Element;
}

export function ProtectedRoute({ outlet }: RouteProps) {
    const user = useAppSelector(state => state.auth);
    const isAuthenticated = user.email !== null && user.email !== undefined;

    if (isAuthenticated) {
        return outlet;
    }

    return <Navigate to={{ pathname: '/auth/login' }} replace />;
}

// Uno reverse ProtectedRoute to always redirect back to the dasboard.
export function PublicRoute({ outlet }: RouteProps) {
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

export async function validatePassword(password: string, passwordConfirm: string): Promise<void> {
    return new Promise(function (resolve, reject) {
        if (password !== passwordConfirm) {
            reject('Passwords do not match');
        } else {
            resolve();
        }
    });
};
