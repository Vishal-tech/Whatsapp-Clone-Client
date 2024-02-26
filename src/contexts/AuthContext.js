import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
import apiRequest from "../services/axiosConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, fullName) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user.updateProfile({
            displayName: fullName,
          });
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };

  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

  const signout = () => {
    return auth.signOut();
  };

  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Add a request interceptor to attach Firebase ID token to each request
      apiRequest.interceptors.request.use(
        async (config) => {
          if (user) {
            console.log("Current user found:", user.uid);
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    passwordReset,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
