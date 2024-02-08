import { createContext, useContext, ReactNode, useState } from "react";
import { User } from "../../FirebaseService";

interface ExtendedUser extends User {
  isAdmin: boolean;
}

interface UserContextProps {
  user: ExtendedUser | null;
  login: (user: ExtendedUser) => void;
  logout: () => void;
  setUserIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isAdmin, setUserIsAdmin] = useState<boolean>(true);

  const login = (loggedInUser: User) => {
    const extendedUser: ExtendedUser = { ...loggedInUser, isAdmin: isAdmin };
    setUser(extendedUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUserIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
