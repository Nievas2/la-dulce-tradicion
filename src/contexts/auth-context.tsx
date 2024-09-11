"use client"
import { User } from '@/interfaces/User';
import { decodeJwt } from '@/utils/decodeJwt';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthUser {
  user  : any;
  token : string;
}

interface AuthContextType {
  authUser    : AuthUser | null;
  setAuthUser : (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  let storedUser 
  
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);


  useEffect(() => {
    storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    let user = null
    if(storedUser){
      const data = decodeJwt(token);
      user = {
        user  : data,
        token: storedUser
      }
    }
    setAuthUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};