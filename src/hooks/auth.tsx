import React, { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    user: string
}
export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{user:'Vitor'}}>
        {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth};
