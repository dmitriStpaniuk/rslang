import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { axiosApiInstance, __baseUrl__ } from "./constant";

type UserProviderProps = {
  children: ReactNode
}

export type User = {
  id: string;
  name: string;
  email: string;
}

type UserContextValue = [
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
]

const getUserById = async (id: string) => {
  const response = await axiosApiInstance.get<Omit<User, 'id'>>(__baseUrl__ + 'users/' + id)
  return response.data

}

const userContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('idUser')
    if (userIdFromStorage) {
      getUserById(userIdFromStorage.slice(1, -1)).then((result)=> {
        setUser({...result, id: userIdFromStorage.slice(1, -1)})
      })
    }
  }, [])
  return (
    <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>
  )
}

export const useUser = () => {
  return useContext(userContext) as UserContextValue
}
