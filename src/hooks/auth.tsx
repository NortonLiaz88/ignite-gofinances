import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";


import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthProviderProps {
  children: ReactNode;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}
interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle (): Promise<void>;
  signOut (): Promise<void>;
  userStorageLoading: boolean;
}
export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(false);

  const userStorageKey = "@gofinances:user";

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut, userStorageLoading }}>
      {children}
    </AuthContext.Provider>
  );

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      console.log(type, params);
      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        });
      }
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey)
  }
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
