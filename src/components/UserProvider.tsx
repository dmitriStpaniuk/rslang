import { createContext, ReactNode, useContext, useState } from "react";

type UserProviderProps = {
  children: ReactNode
}

type User = {
  "userId": string,
  "name": string
}

type UserContextValue = [
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
]

const userContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  return (
    <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>
  )
}

export const useUser = () => {
  return useContext(userContext) as UserContextValue
}
