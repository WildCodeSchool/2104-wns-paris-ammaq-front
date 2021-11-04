import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Token from "../types/Token";

type AuthState = {
  token?: Token;
  setToken: Dispatch<SetStateAction<Token | undefined>>;
};

type AuthProviderProps = {
  initialToken?: Token;
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthState);
export const useAuth = (): AuthState => useContext(AuthContext);

const AuthProvider = ({
  children,
  initialToken,
}: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState(initialToken);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
