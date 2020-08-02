import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<boolean>(false);
const AuthUpdateContext = createContext<((loggedIn: boolean) => void) | null>(
  null
);

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }: any) {
  const [isLoggedIn, setLoginState] = useState(false);

  const updateLogin = () => {
    setLoginState((isLoggedIn) => !isLoggedIn);
  };

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <AuthUpdateContext.Provider value={updateLogin}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
