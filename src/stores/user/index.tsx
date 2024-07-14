import { auth } from "@/firebase";
import { signOut, User } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Structure of the user session and utility states and functions
 */
type T_UserContextState = {
  user: User | null;
  isLoading: boolean;
  deleteSession: () => void;
};

//
const initialState: T_UserContextState = {
  user: null,
  isLoading: false,
  deleteSession() {},
};

/**
 * Context to store the user session and other utility states and functions
 */
const UserContext = createContext<T_UserContextState>(initialState);

//
type UserProviderProps = {};

/**
 * Provides access to the user session in the children components
 */
function UserProvider(props: PropsWithChildren<UserProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  /**
   * Deletes the user session
   */
  const deleteSession = () => {
    setLoading(true);
    signOut(auth).finally(() => setLoading(false));
  };

  return (
    <UserContext.Provider value={{ user, isLoading, deleteSession }}>
      {props.children}
    </UserContext.Provider>
  );
}

/**
 * Consumes UserContext to use `user` and utility states and functions like `isLoading`, `addSession`, `removeSession`, etc.
 */
const useUser = () => useContext(UserContext);

//
export { UserProvider, useUser };
