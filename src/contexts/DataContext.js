import { useContext, useState, useEffect, createContext } from "react";
import { useAuth } from "./AuthContext";
import { fetchUser } from "../services/api";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentUserObj, setCurrentUserObj] = useState();

  const fetchCurrentUserObj = async (currentUserUid) => {
    try {
      const response = await fetchUser(currentUserUid);
      setCurrentUserObj(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCurrentUserObj(currentUser);
    }
  }, [currentUser]);

  return (
    <DataContext.Provider value={{ currentUserObj, setCurrentUserObj }}>
      {children}
    </DataContext.Provider>
  );
};
