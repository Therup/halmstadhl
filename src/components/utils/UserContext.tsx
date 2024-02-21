import { createContext, useContext, ReactNode, useState } from "react";
import { User } from "../../FirebaseService";

// Definiera ett utökat användargränssnitt som inkluderar isAdmin-egenskapen
interface ExtendedUser extends User {
  isAdmin: boolean;
}

// Definiera användarkontextens egenskaper
interface UserContextProps {
  user: ExtendedUser | null; // Användaren som är inloggad
  login: (user: ExtendedUser) => void; // Funktion för att logga in användaren
  logout: () => void; // Funktion för att logga ut användaren
  setUserIsAdmin: React.Dispatch<React.SetStateAction<boolean>>; // Funktion för att ställa in om användaren är administratör
}

// Skapa en användarkontext
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Skapa en komponent för att tillhandahålla användarkontexten till komponenterna
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ExtendedUser | null>(null); // Användarstatet för att spåra inloggad användare
  const [isAdmin, setUserIsAdmin] = useState<boolean>(true); // Statet för att spåra om användaren är administratör

  const login = (loggedInUser: User) => {
    const extendedUser: ExtendedUser = { ...loggedInUser, isAdmin: isAdmin }; // Lägg till isAdmin-egenskapen till inloggade användaren
    setUser(extendedUser); // Uppdatera användarstatet med den inloggade användaren
  };

  const logout = () => {
    setUser(null); // Återställ användarstatet till null för att indikera att ingen användare är inloggad
  };

  // Returnera användarkontexten
  return (
    <UserContext.Provider value={{ user, login, logout, setUserIsAdmin }}>
      {children}{" "}
      {/* Rendera underliggande komponenter som barn till kontexten */}
    </UserContext.Provider>
  );
};

// Anpassa en krok för att använda användarkontexten i komponenter
export const useUser = () => {
  const context = useContext(UserContext); // Hämta användarkontexten
  if (!context) {
    throw new Error("useUser måste vara inom UserProvider"); // Throw ett fel om användarkontexten inte hittas
  }
  return context; // Returnera användarkontexten
};
