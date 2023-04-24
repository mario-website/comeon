import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  PropsWithChildren,
} from "react";

interface Player {
  avatar: string;
  event: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  player: Player | null;
}

type AuthAction = {type: "LOGIN"; payload: {player: Player | null}} | {type: "LOGOUT"};

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch<AuthAction> | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      // Handle login logic
      return {...state, isAuthenticated: true, player: action.payload.player};
    case "LOGOUT":
      // Handle logout logic
      return {...state, isAuthenticated: false, player: null};
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    player: null,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

export const useAuthDispatch = (): Dispatch<AuthAction> => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};
