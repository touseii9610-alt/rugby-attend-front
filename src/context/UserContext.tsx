import { createContext, useContext, useEffect, useState } from "react";
import { getLineProfile } from "../config/liff";

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
    async function loadUser() {
      try {
        const profile = await getLineProfile();

        if (!profile) {
          return;
        }

        console.log("LINE profile:", profile);

        const res = await fetch(
          "https://rugby-attend-back.onrender.com/api/users/line-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lineUserId: profile.userId,
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl,
            }),
          },
        );

        const data = await res.json();
        setCurrentUser(data);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
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
