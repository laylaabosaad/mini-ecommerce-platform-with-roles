import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:2000/auth/verify-logged-token",
        {
          withCredentials: true,
        }
      );

      const user = res.data.user;
      setUserInfo(user);
      setUserRole(user.role);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setUserInfo(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ role: userRole, userInfo, authenticated, loading, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
