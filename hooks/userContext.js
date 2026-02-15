"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Auth, setAuth] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setAuth(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(true);
    } else {
      localStorage.removeItem("user");
      setAuth(false);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        bookmarks,
        setBookmarks,
        isLoading,
        setIsLoading,
        Auth,
        setAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
