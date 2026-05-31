import { createContext, useContext, useEffect, useState } from "react";

type CurrentUser = {
  id: number;
  userName: string;
  displayName: string;
  role: string;
};

type UserContextType = {
  currentUser: CurrentUser | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  currentUser: null,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/current")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(UserContext);
}
