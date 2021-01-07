import { useCallback, useEffect, useState } from "react";

let logoutTime;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((uid, token, username, expirationDate) => {
    console.log(uid, token, expirationDate, username);
    setToken(token);
    setUserId(uid);
    setUserName(username);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 5000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        name: username,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    setUserName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTime = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTime);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.name,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, userName };
};
