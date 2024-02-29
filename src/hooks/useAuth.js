import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
    const { auth } = useContext(AuthContext)
    useDebugValue(auth, auth => (
        auth?.user ? `Logged in as ${auth.user}` : 'Not logged in'
    ))

    return useContext(AuthContext);
}