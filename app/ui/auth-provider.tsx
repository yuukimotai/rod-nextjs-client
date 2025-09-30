'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  jwtString: string | undefined;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ jwtString, children }: AuthContextType & { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ jwtString }}>
      {children}
    </AuthContext.Provider>
  );
}