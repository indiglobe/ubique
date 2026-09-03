import { createContext, useContext, useState, type ReactNode } from "react";

export type AuthMode = "signin" | "signup";

type TUseAuthForm = {
  activeSection: AuthMode;
  toggleActiveSection: (nestSection: AuthMode) => void;
};

const AuthContext = createContext<TUseAuthForm | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<AuthMode>("signin");

  function toggleActiveSection(nextSection: AuthMode) {
    setActiveSection(nextSection);
  }

  return (
    <AuthContext.Provider value={{ activeSection, toggleActiveSection }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthContext.Provider");
  }

  return context;
}
