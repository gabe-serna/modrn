"use client";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext({} as UserContextProps);

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
