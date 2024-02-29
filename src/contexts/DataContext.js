import { useContext, useState, useEffect, createContext } from "react";
import { useAuth } from "./AuthContext";
import { fetchUser } from "../services/api";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
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
      fetchCurrentUserObj(currentUser.uid);
    }
    setLoading(false);
  }, [currentUser]);

  return (
    <DataContext.Provider value={{ currentUserObj, setCurrentUserObj }}>
      {!loading && children}
    </DataContext.Provider>
  );
};
